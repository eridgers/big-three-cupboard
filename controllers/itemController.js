var Item = require('../models/item');

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