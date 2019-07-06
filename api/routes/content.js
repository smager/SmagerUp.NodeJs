var express  = require('express');
var router = express.Router();
var content = require('../models/content');
const mongoose  = require('mongoose');

//functions:
function edit(req,res){
    var _name =  req.params.name;
    var _type =  req.params.type || "html";
    content.find( {name:_name, type: _type}) 
        .exec()
        .then( d =>{
           var _info = d[0] || { name: _name, type: _type, source:"no " + _type + " source yet."} ;
           _info.title= _info.name;
           _info.appName = appName;
           _info.layout ="edit-content";
           _info.aceSourceType = (_type =="js" ?"javascript" : _type  );
           _info.baseURL = req.protocol + '://' + req.get('host');
            res.render("content/edit",_info);
        })
        .catch( err=>{
            res.status(500).json({error:err});
        });
}
function sendError(res,err){
    console.log("error",err);
    res.status(500).json({errorMsg:err + ""});
}

//get page list
router.get('/',(req,res,next)=> {
    content.find()
        .exec()
        .then(docs=>{
            //console.log(docs);
            res.status(200).json(docs);
            //res.render("content/list");

        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
 
});
//get page name
router.get('/:name',(req,res)=> {
    edit(req,res);
});
//get page name with type
router.get('/:name/:type',(req,res)=> {
    edit(req,res);
});

router.post('/',(req,res,next)=> {
    var _info = req.body;
    content.find( {name:_info.name, type:_info.type}) 
    .exec()
    .then( d =>{
        if(d.length > 0){
            //found content
            content.update({name:_info.name,type:_info.type}, {$set: req.body})
           .exec()
           .then( result =>{
                res.status(201).json({msg:msgDataSave, result : result});
           })
           .catch( err=>{ sendError(res,err);});           
        }else{
            //not found content            
            content.find( {name:_info.name, type:"html"}) 
            .exec()
            .then(d2 => {
                const _content =  new content({
                    _id     : new mongoose.Types.ObjectId()
                    ,name   : _info.name
                    ,source : _info.source
                    ,type   :_info.type
                });
                if(d2.length > 0){
                    _content.page = d2[0]._id;
                }
                _content.save()
                .then(result =>{
                    res.status(201).json({msg:msgDataSave, result : result});
                })
                .catch( err=>{ sendError(res,err);});
            })
            .catch( err=>{ sendError(res,err);});

            
        }

    })
    .catch( err=>{ sendError(res,err);});
});

module.exports = router;