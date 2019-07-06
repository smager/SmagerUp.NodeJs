const mongoose  = require('mongoose');
const ContentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
     name:String
    ,source:String
    ,type:String
    ,page:{type:mongoose.Schema.Types.ObjectId, ref : "Content"}
    ,links:[]
});

module.exports = mongoose.model('Content',ContentSchema);