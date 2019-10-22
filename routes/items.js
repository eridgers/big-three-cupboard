var express = require('express');
var router = express.Router();

var item_controller = require('../controllers/itemController');

// ITEM ROUTES //


// list
router.get('/', item_controller.item_list);

// detail (SHOW)
router.get('/:id', item_controller.item_detail);

// new
router.get('/new', item_controller.item_new);
// create
router.post('/', item_controller.item_create);

// edit
router.get('/:id/edit', item_controller.item_edit);
// update
router.put('/:id', item_controller.item_update);

// delete
router.delete('/:id', item_controller.item_delete);

module.exports = router;