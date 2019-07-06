const express  = require('express');
const router = express.Router();
const Content = require('../models/content');

function sendError(res,err){
    console.log("error",err);
    res.status(500).json({errorMsg:err + ""});
}

router.get('/',(req,res)=> {
    res.render("page/index",{title:"Pages"});
});

router.get('/:name',(req,res)=> {
    const _name =  req.params.name;
    Content.find( {name:_name,type:"html"}) 
        .exec()
        .then( d =>{
        var _info = d[0];
       // console.log("page:name",_info);
        if( _info){
            _info.title= _info.name;
            _info.appName = appName;
            
            Content.find({page : _info._id})
            .exec()
            .then( d2 =>{
                _info.links = d2;
                res.status(200).json({result:_info});
                //res.render("page/name",_info);
            })
            .catch( err=>{ sendError(res,err);});
        
        }else res.render("page/notfound",{pageName:_name});
        })
        .catch( err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
});


 module.exports = router;