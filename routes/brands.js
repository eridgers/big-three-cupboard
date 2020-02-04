var express = require('express');
var router = express.Router();

var brand_controller = require('../controllers/brandController');

// BRAND ROUTES //

// get list of brands
router.get('/', brand_controller.brand_list);

// create GET
router.get('/new', brand_controller.brand_new);

// create POST
router.post('/', brand_controller.brand_create);

// get brand
router.get('/:id', brand_controller.brand_detail);

// update GET (edit)
router.get('/:id/edit', brand_controller.brand_edit);
// update PUT
router.put('/:id/update', brand_controller.brand_update);

// delete get
router.delete('/:id', brand_controller.brand_delete_get);
// delete post
router.delete('/:id', brand_controller.brand_delete_post);

module.exports = router;
