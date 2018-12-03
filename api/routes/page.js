const express  = require('express');
const router = express.Router();
const Content = require('../models/content');

 
router.get('/',(req,res,next)=> {
    res.render("page/index",{title:"Pages"});
});

router.get('/:name',(req,res,next)=> {
    const _name =  req.params.name;
    Content.find( {name:_name,type:"html"}) 
        .exec()
        .then( d =>{
           var _info = d[0];
           if( _info){
            _info.title= _info.name;
            _info.appName = appName;
                res.render("page/name",_info);
           }else res.render("page/notfound",{pageName:_name});
        })
        .catch( err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
});


 module.exports = router;