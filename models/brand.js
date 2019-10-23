var mongoose = require('mongoose');

brandSchema = mongoose.Schema({
    name: {type: String, required: true}
})

// virtual
brandSchema.virtual('url').get(function(){
    return '/brands/' + this.id;
})

brandSchema.virtual('averagePrice').get(function(){
    // return average price for items which have this brand.....maybe better to do in the view?
    return 5;
})

module.exports = mongoose.model('Brand', brandSchema);