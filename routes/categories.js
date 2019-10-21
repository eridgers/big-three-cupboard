var express = require('express');
var router = express.Router();

var category_controller = require('../controllers/categoryController');

// CATEGORY ROUTES //


// list
router.get('/categories', category_controller.category_list);

// detail
router.get('/categories/:id', category_controller.category_detail);

// create GET
router.get('/categories/new', category_controller.category_new);
// create POST
router.post('/categories/create', category_controller.category_create);

// update GET
router.get('/categories/:id/edit', category_controller.category_edit);
// update POST
router.put('/categories/:id/update', category_controller.category_update);

// delete
router.delete('/categories/:id', brand_controller.brand_delete);

module.exports = router;
