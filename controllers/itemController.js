var Item = require('../models/item');
var Brand = require('../models/brand');
var Category = require('../models/category');
var async = require('async');

const { check, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

// items list
exports.item_list = function(req, res, next){
    Item.find({}).populate('brand category', 'name url logo').exec(function(err, items){
        if(err) {return next(err);}
        if(items==null){
            res.send('NO ITEMS');
        }
        res.render('../views/items/index', {title: 'Complete Item Closet!', items: items});
    })
};

// one item
exports.item_detail = function(req, res, next){
    Item.findById(req.params.id).exec(function(err, item){
        if(err) {return next(err);}
        if(item==null){
            var err = new Error('Item not found');
            err.status = 404;
            return next(err);
        }
        res.render('../views/items/show', {title: 'Details for ', item: item});
    })
};

// create GET
exports.item_new = function(req, res, next){
    async.parallel({
        brands: function(callback){
            Brand.find(callback);
        },
        categories: function(callback){
            Category.find(callback);
        },
    }, function(err, results){
        if(err) {return next(err);}
        res.render('../views/items/item_form', {title: 'Create Gear', brands: results.brands, categories: results.categories});
    });
};

// create POST
// export array rather than single function
exports.item_create = [

    // Validate fields using express-validator
    check('name').isAlphanumeric().trim(),
    check('weight').isInt().trim(),
    check('cost').isDecimal().trim(),
    check('description').isAlphanumeric().isLength({min: 30}).withMessage('Description must be at least 30 characters.').trim(),
    // TODO Image and quantity needs to be dealt with!

    // Santize fields using express-validator
    sanitizeBody('*').escape(),
    sanitizeBody('brand.*').escape(),    
    sanitizeBody('category.*').escape(),    
    // Now process request
    (req, res, next) => {
        // Extract Validation errors from request
        const errors = validationResult(req);
        // Create new Item object with trimmed/escaped data
        var item = new Item(
            {   name: req.body.name,
                brand: req.body.brand,
                category: req.body.category,
                weight: req.body.weight,
                cost: req.body.cost,
                description: req.body.description,
                //PLACEHOLDER
                quantity: 1,
                image: ' '
            });
            console.log('item ' + item);
        // Check for errors, if there are some render form again with data which was input
        if(!errors.isEmpty()){
            // get Brands and Categories for the form (as in NEW GET)
            async.parallel({
                brands: function(callback){
                    Brand.find(callback);
                },
                categories: function(callback){
                    Category.find(callback);
                },
            }, function(err, results){
                if(err) {return next(err);}
                // render the new form
                res.render('../views/items/item_form', {title: 'Create Gear', brands: results.brands, categories: results.categories, item: item, errors: errors.array()});
            });
            return;
        }
        // Else data is valid Save Item to DB
        else{
            item.save(function(err){
                if(err) {return next(err);}
                // success? redirect user to the item they created.
                res.redirect(item.url);
            });
        }
    }

];

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
