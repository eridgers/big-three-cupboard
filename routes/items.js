var express = require('express');
var router = express.Router();

var item_controller = require('../controllers/itemController');

// ITEM ROUTES //


// list
router.get('/', item_controller.item_list);

// new
router.get('/new', item_controller.item_new);

// create
router.post('/new', item_controller.item_create);

// detail (SHOW)
router.get('/:id', item_controller.item_detail);

// edit
router.get('/:id/edit', item_controller.item_edit);
// update
router.post('/:id/edit', item_controller.item_update);

// delete get
router.get('/:id/delete', item_controller.item_delete_get);
// delete post
router.post('/:id/delete', item_controller.item_delete_post);

module.exports = router;
