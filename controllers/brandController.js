const Brand = require('../models/brand');
const Item = require('../models/item');
const async = require('async');
const multer = require('multer');

// Storage setup
var storage = multer.diskStorage({
    destination: './public/images/uploads/',
    filename: function(req, file, done) {
      done(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
  });
const upload = multer({ storage: storage }).single('logo');
const path = '/images/uploads/'; 

const { check, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

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
    res.render('../views/brands/brand_form', {title: 'Create Brand'});
};

// create brand POST
exports.brand_create = [
    // upload logo
    upload,
    // validate fields using express-validator
    check('name').isLength({min: 1}).withMessage('Brand name must not be empty').trim(),
    check('description').isLength({min: 10}).withMessage('Description must be at least 10 characters').trim(),
    //santize
    sanitizeBody('*').escape(),

    (req, res, next) => {
        //extract validation errors
        const errors = validationResult(req);
        //create new Brand object with trimmed/escaped data
        var brand = new Brand(
            {
                name: req.body.name,
                description: req.body.description,
                logo: path + req.file.filename
            });
        //check for errors, if yes render form again
        if(!errors.isEmpty()){
            console.log('logo' +brand.logo)
            res.render('../views/brands/brand_form' ,{title: 'Create Brand', brand: brand, errors: errors.array()});
        }else{
            //else data valid so try to save item to DB
            brand.save(function(err){
                if(err) {return next(err);}
            //check errors if success redirect to new brand
            res.redirect(brand.url);
            });
        }
    }   
];



// delete brand GET
exports.brand_delete_get = function(req, res, next){
    async.parallel({
        brand: function(callback){
            Brand.findById(req.params.id).exec(callback)
        },
        items: function(callback){
            Item.find({'brand': req.params.id}).exec(callback)
        },
    }, function(err, results){
            if (err) {return next(err);}
            if (results.brand == null){
                res.redirect('/brands');
            }
            res.render('../views/brands/brand_delete', {title: 'Delete Brand', brand: results.brand, items: results.items});
    });
}

// delete brand POST
exports.brand_delete_post = function(req, res, next){
    async.parallel({
        brand: function(callback){
            Brand.findById(req.params.id).exec(callback)
        },
        items: function(callback){
            Item.find({'brand': req.params.id}).exec(callback)
        },
    }, function(err, results){
            if(err) {return next(err);}
            if(results.brand == null){
                res.redirect('/brands');
            }else{
                Brand.findById(req.params.id, function(err, brand){
                    if(err) {return next(err);}
                    brand.remove();
                    res.redirect('/brands');
                });
            }
    });
};

// update brand GET (edit)
exports.brand_edit = function(req, res, next){
    Brand.findById(req.params.id, function(err, brand){
        if(err) {return next(err);}
        if(brand==null){
            var err = new Error('Brand not found');
            err.status = 404;
            return next(err);
        }
        res.render('../views/brands/brand_form', {title: 'Edit Brand', brand: brand});
    });
};

// update brand PUT
exports.brand_update = [
    check('name').isLength({min: 1}).withMessage('Brand name must not be empty').trim(),
    check('description').isLength({min: 10}).withMessage('Description must be at least 10 characters').trim(),
    sanitizeBody('*').escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        var brand = new Brand(
            {
                name: req.body.name,
                description: req.body.description,
                //placeholder logo
                // logo: ' ',
                _id: req.params.id
            });
        if(!errors.isEmpty()){
            res.render('../views/brands/brand_form' ,{title: 'Edit Brand', brand: brand, errors: errors.array()});
        }else{
            Brand.findByIdAndUpdate(req.params.id, brand, {}, function(err, thisBrand){
                if(err) {return next(err);}
                res.redirect(thisBrand.url);
            });
        }
    }   
];
