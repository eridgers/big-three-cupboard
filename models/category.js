var mongoose = require('mongoose');
const Item = require('./item');

var categorySchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        image: {type: String, required: true}
    }
)

// virtual url
categorySchema.virtual('url').get(function() {return '/categories/' + this.id;})

categorySchema.pre("remove", async function(){
    try{
        await 
            Item.remove({'category': this.id}).exec();
    } catch(err){
        console.log(err)
    }
});

module.exports = mongoose.model('Category', categorySchema);