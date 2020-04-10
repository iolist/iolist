const models = require('../../models');

const { Node } = models;

module.exports.createNode = function (req, res) {
  Node.create({
    ...req.body,
    created_at: new Date()
  })
    .then((node) => {
      console.log(node);
      res.json(node);
    }, (error) => {
      console.error(error);
      res.status(500).send(error);
    });
};

module.exports.editNode = function (req, res) {
  Node.findByPk(req.params.id).then((node) => {
    console.log(node);
    if (node) {
      node.update(req.body).then(() => {
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
    console.log(node);
    if (node) {
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
