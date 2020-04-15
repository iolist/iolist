const { Op } = require('sequelize');
const models = require('../../models');

const { Node } = models;

module.exports.createNode = function (req, res) {
  Node.create({
    ...req.body,
    created_at: new Date()
  })
    .then((node) => {
      console.log(node.previous_id, JSON.stringify(node));
      // update next node to link it to new created
      Node.update(
        {
          previous_id: node.id,
          updated_at: new Date()
        },
        {
          where: {
            [Op.and]: [
              { previous_id: node.previous_id },
              { id: { [Op.ne]: node.id } }
            ]
          }
        }
      );
      res.json(node);
    }, (error) => {
      console.error(error);
      res.status(500).send(error);
    });
};

module.exports.editNode = function (req, res) {
  Node.findByPk(req.params.id).then((node) => {
    if (node) {
      node.update({ ...req.body, updated_at: new Date() }).then(() => {
        res.json({ id: node.id });
      }, (error) => {
        console.error(error);
        res.status(500).send(error);
      });
    }
  }, (error) => {
    res.status(500).send(error);
  });
};

module.exports.deleteNode = function (req, res) {
  Node.findByPk(req.params.id).then((node) => {
    if (node) {
      // move link to previous node if it exists
      Node.update(
        { previous_id: node.previous_id, updated_at: new Date() },
        { where: { previous_id: node.id } }
      );
      node.destroy().then(() => {
        res.json({ deleted_id: req.params.id });
      }, (error) => {
        console.error(error);
        res.status(500).send(error);
      });
    }
  }, (error) => {
    res.status(500).send(error);
  });
};
