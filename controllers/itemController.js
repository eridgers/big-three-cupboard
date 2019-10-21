var Item = require('../models/item');

// items list
exports.item_list = function(req, res, next){
    res.send('ITEM LIST');
};

// one item
exports.item_detail = function(req, res, next){
    res.send('ITEM DETAIL');
};

// create GET
exports.item_new = function(req, res, next){
    res.send('ITEM CREATE GET');
};
// create POST
exports.item_create = function(req, res, next){
    res.send('ITEM CREATE POST');
};

// update GET
exports.item_edit = function(req, res, next){
    res.send('ITEM UPDATE GET');
};
// update POST
exports.item_update = function(req, res, next){
    res.send('ITEM UPDATE POST');
};

// delete POST
exports.item_delete = function(req, res, next){
    res.send('ITEM DELETE POST');
};