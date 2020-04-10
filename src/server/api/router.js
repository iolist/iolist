const express = require('express');
const router = express.Router();

const listController = require('./controllers/list.controller.js');
const nodeController = require('./controllers/node.controller.js');

router.get('/lists', listController.getAllLists);

router.post('/list', listController.createList);

router.get('/list/:id', listController.getListContent);

router.delete('/list/:id', listController.deleteList);

router.post('/node', nodeController.createNode);

router.put('/node/:id', nodeController.editNode);

router.delete('/node/:id', nodeController.deleteNode);

router.use('*', (req, res) => {
  res.status(404).send({message: 'API not found'});
});

module.exports = router;
