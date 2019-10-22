var express = require('express');
var router = express.Router();

var category_controller = require('../controllers/categoryController');

// CATEGORY ROUTES //


// list
router.get('/', category_controller.category_list);

// detail
router.get('/:id', category_controller.category_detail);

// create GET
router.get('/new', category_controller.category_new);
// create POST
router.post('/', category_controller.category_create);

// update GET
router.get('/:id/edit', category_controller.category_edit);
// update POST
router.put('/:id/update', category_controller.category_update);

// delete
router.delete('/:id', category_controller.category_delete);

module.exports = router;
