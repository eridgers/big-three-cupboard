var Category = require('../models/category');
var Item = require('../models/item');
var mongoose = require('mongoose');
var async = require('async');

const { check, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

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
    res.render('../views/categories/category_form', {title: 'Create Category of Gear'});
};

// create POST
exports.category_create = [
    //validate fields using express-validator
    check('name').isLength({min: 1}).withMessage('Name must not be empty').matches(/^[a-z0-9 ]+$/i).withMessage('Category must be reasonable').trim(),
    check('description').isLength({min: 10}).withMessage('Description must be at least 10 characters').matches(/^[a-z0-9 ]+$/i).trim(),
    //santize
    sanitizeBody('*').escape(),
    //process request
    (req, res, next) => {
        //extract validation errors
        const errors = validationResult(req);
        //create new Brand object with trimmed/escaped data
        var category = new Category({
            name: req.body.name,
            description: req.body.description,
            //placeholder image
            image: ' '
        })
        console.log(category);
        console.log(errors);
        //check for errors, if yes render form again
        if(!errors.isEmpty()){
            res.render('../views/categories/category_form', {title: 'Create Category of Gear', category: category, errors: errors.array()});
        }else{
            //else data valid so try to save item to DB
            category.save(function(err){
                if(err) {return next(err);}
                res.redirect(category.url);
            });
        }
    }
];

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