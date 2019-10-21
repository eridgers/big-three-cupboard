var express = require('express');
var router = express.Router();

var item_controller = require('../controllers/itemController');

// ITEM ROUTES //


// list
router.get('/items', item_controller.item_list);

// detail (SHOW)
router.get('/items/:id', item_controller.item_detail);

// new
router.get('/items/new', item_controller.item_new);
// create
router.post('/items', item_controller.item_create);

// edit
router.get('/items/:id/edit', item_controller.item_edit);
// update
router.put('/items/:id', item_controller.item_update);

// delete
router.delete('/items/:id', item_controller.item_delete);