var mongoose = require('mongoose');
const Item = require('./item');

brandSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    logo: {type: String, required: true}
})

// virtual
brandSchema.virtual('url').get(function(){
    return '/brands/' + this.id;
})

brandSchema.virtual('averagePrice').get(function(){
    // return average price for items which have this brand.....maybe better to do in the view?
    return 5;
})

brandSchema.pre("remove", async function(){
    try{
        await Item.remove({'brand': this.id}).exec();
    } catch(err){
        console.log(err)
    }
});

module.exports = mongoose.model('Brand', brandSchema);