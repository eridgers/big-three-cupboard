var Category = require('../models/category');
var Item = require('../models/item');
var mongoose = require('mongoose');
var async = require('async');

// category list
exports.category_list = function(req, res, next){
    Category.find({}).exec(function(err, categories){
        if(err) {return next(err);}
        if(categories==null){
            res.send('NO CATEGORIES');
        }
        res.render('../views/categories/index', {title: 'Explore Categories!', categories: categories});
    })
};

// one category
exports.category_detail = function(req, res, next){
    var id = mongoose.Types.ObjectId(req.params.id);
    // need to search on category passed from link?
    async.parallel({
        category: function(callback){
            Category.findById(id).exec(callback);
        },
        items: function(callback){
            Item.find({'category': id}).populate('brand').exec(callback);
        },
    }, function(err, results){
        if(err) {return next(err);}
        if(results.category==null){
            var err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('../views/categories/show', {title: results.category.name, items: results.items});
    });
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