var Brand = require('../models/brand');

// list all brands GET 
exports.brand_list = function(req, res, next){
    res.send('BRAND LIST');
};
// get one brand GET
exports.brand_detail = function(req, res, next){
    res.send('BRAND DETAIL');
};

// create brand GET
exports.brand_new = function(req, res, next){
    res.send('BRAND CREATE GET');
};
// create brand POST
exports.brand_create = function(req, res, next){
    res.send('BRAND CREATE POST');
};

// delete brand POST
exports.brand_delete = function(req, res, next){
    res.send('BRAND DELETE POST');
};

// update brand GET (edit)
exports.brand_edit = function(req, res, next){
    res.send('BRAND UPDATE GET');
};
// update brand PUT
exports.brand_update = function(req, res, next){
    res.send('BRAND UPDATE POST');
};