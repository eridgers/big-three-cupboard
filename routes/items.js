var express = require('express');
var router = express.Router();

var item_controller = require('../controllers/itemController');

// ITEM ROUTES //


// list
router.get('/', item_controller.item_list);

// new
router.get('/new', item_controller.item_new);

// create
router.post('/', item_controller.item_create);

// detail (SHOW)
router.get('/:id', item_controller.item_detail);

// edit
router.get('/:id/edit', item_controller.item_edit);
// update
router.put('/:id', item_controller.item_update);

// delete get
router.delete('/:id', item_controller.item_delete_get);
// delete post
router.delete('/:id', item_controller.item_delete_post);

module.exports = router;
