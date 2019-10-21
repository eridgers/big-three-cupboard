var Category = require('../models/category');

// category list
exports.category_list = function(req, res, next){
    res.send('CATEGORY LIST');
};
// one category
exports.category_detail = function(req, res, next){
    res.send('CATEGORY DETAIL');
};

// create GET
exports.category_new = function(req, res, next){
    res.send('CATEGORY CREATE GET');
};
// create POST
exports.category_create = function(req, res, next){
    res.send('CATEGORY CREATE POST');
};

// update GET (edit)
exports.category_edit = function(req, res, next){
    res.send('CATEGORY UPDATE GET');
};
// update PUT
exports.category_update = function(req, res, next){
    res.send('CATEGORY UPDATE POST');
};

// delete POST
exports.category_delete = function(req, res, next){
    res.send('CATEGORY DELETE POST');
};