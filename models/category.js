var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true}
    }
)

// virtual url
categorySchema.virtual('url').get(function() {return '/categories/' + this.id;})

module.exports = mongoose.model('category', categorySchema);