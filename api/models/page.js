const mongoose  = require('mongoose');
const PageSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
     name:String
    ,content:String
});

module.exports = mongoose.model('Page',PageSchema);