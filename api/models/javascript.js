const mongoose  = require('mongoose');
const JavaScriptSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
     name:String
    ,content:String
});

module.exports = mongoose.model('JavaScript',JavaScriptSchema);