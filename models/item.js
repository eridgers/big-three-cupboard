var mongoose = require('mongoose');

itemSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 50},
    brand: {type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true},
    weight: {type: Number, required: true},
    cost: {type: Number, required: true},
    quantity: {type: Number, required: true, max: 10},
    description: {type: String, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    image: {type: String, required: true}
});

// virtual
itemSchema.virtual('url').get(function(){
    return '/items/' + this.id;
})

itemSchema.virtual('costByGram').get(function(){
    return Math.round((this.weight / this.cost)*100) / 100;
})

module.exports = mongoose.model('Item', itemSchema);