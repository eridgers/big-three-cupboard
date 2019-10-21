var express = require('express');
var router = express.Router();

var brand_controller = require('../controllers/brandController');

// BRAND ROUTES //

// get list of brands
router.get('/brands', brand_controller.brand_list);

// get brand
router.get('/brands/:id', brand_controller.brand_detail);

// create GET
router.get('/brands/new', brand_controller.brand_new);
// create POST
router.post('/brands/', brand_controller.brand_create);

// update GET (edit)
router.get('/brands/:id/edit', brand_controller.brand_edit);
// update PUT
router.put('/brands/:id/update', brand_controller.brand_update);

// delete
router.delete('/brands/:id', brand_controller.brand_delete);

module.exports = router;