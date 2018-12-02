const mongoose  = require('mongoose');
const ContentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
     name:String
    ,source:String
    ,type:String
});

module.exports = mongoose.model('Content',ContentSchema);