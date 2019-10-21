var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true}
    }
)

// virtual url
categorySchema.virtual('url').get(function() {return '/category/' + this.id;})

module.exports = mongoose.model('category', categorySchema);