var Brand = require('../models/brand');
var Item = require('../models/item');
var async = require('async');

// list all brands GET 
exports.brand_list = function(req, res, next){
    Brand.find({}).exec(function(err, brands){
        if(err) {return next(err);}
        if(brands==null){
            res.send('NO BRANDS');
        }
        res.render('../views/brands/index', {title: 'Browse Brands', brands: brands});
    })
};

// get one brand GET
exports.brand_detail = function(req, res, next){
    async.parallel({
        brand: function(callback){
            Brand.findById(req.params.id).exec(callback);
        },
        items: function(callback){
            Item.find({'brand': req.params.id}).populate('category').exec(callback);
        },
    }, function(err, results){
        if(err) {return next(err);}
        if(results.brand==null){
            var err = new Error('Brand not found');
            err.status = 404;
            return next(err);
        }
        res.render('../views/brands/show', {title: results.brand.name, brand: results.brand, items: results.items});
    });
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