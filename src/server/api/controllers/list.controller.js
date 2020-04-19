const models = require('../../models');

const { List } = models;
const { Node } = models;

module.exports.createList = function (req, res) {
  List.create(req.body)
    .then((node) => {
      console.log(node);
      res.json(node);
    }, (error) => {
      console.error(error);
      res.status(500).send(error);
    });
};

module.exports.getAllLists = function (req, res) {
  List.findAll().then((result) => {
    res.json(result);
  }, (error) => {
    console.error(error);
    res.status(500).send(error);
  });
};

module.exports.getListData = function (req, res) {
  List.findByPk(req.params.id).then((node) => {
    console.log(node);
    if (node) {
      res.json(node);
    }
  }, (error) => {
    console.error(error);
    res.status(500).send(error);
  });
};

module.exports.getListContent = function (req, res) {
  List.findByPk(req.params.id).then((list) => {
    if (list) {
      Node.findAll({ where: { list_id: req.params.id } }).then((result) => {
        res.json({ list, nodes: result });
      }, (error) => {
        res.status(500).send(error);
      });
    } else {
      res.status(404).json({});
    }
  }, (error) => {
    console.error(error);
    res.status(500).send(error);
  });
};

module.exports.deleteList = function (req, res) {
  List.findByPk(req.params.id).then((list) => {
    if (list) {
      list.destroy().then(() => {
        res.json({ deleted_id: req.params.id, success: true });
      }, (error) => {
        res.status(500).send(error);
      });
    }
  }, (error) => {
    console.error(error);
    res.status(500).send(error);
  });
};

module.exports.editList = function (req, res) {
  List.findByPk(req.params.id).then((list) => {
    if (list) {
      list.update({ ...req.body }).then(() => {
        res.json({ id: list.id });
      }, (error) => {
        console.error(error);
        res.status(500).send(error);
      });
    }
  }, (error) => {
    res.status(500).send(error);
  });
};
