var express = require('express');
var router = express.Router();

var category_controller = require('../controllers/categoryController');

// CATEGORY ROUTES //


// list
router.get('/', category_controller.category_list);

// create GET
router.get('/new', category_controller.category_new);

// create POST
router.post('/', category_controller.category_create);

// detail
router.get('/:id', category_controller.category_detail);

// update GET
router.get('/:id/edit', category_controller.category_edit);
// update POST
router.put('/:id/update', category_controller.category_update);

// delete get
router.get('/:id/delete', category_controller.category_delete_get);
//delete post
router.post('/:id/delete', category_controller.category_delete_post);

module.exports = router;
