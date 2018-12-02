const express  = require('express');
const router = express.Router();
const Content = require('../models/content');
const mongoose  = require('mongoose');

router.get('/',(req,res,next)=> {
    Content.find()
        .exec()
        .then(docs=>{
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
 
});

router.get('/:ContentId',(req,res,next)=> {
    const id =  req.params.ContentId;
    Content.findById(id)
        .exec()
        .then( doc =>{
            res.status(200).json(doc);
        })
        .catch( err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
});


router.patch('/:ContentId',(req,res,next)=> {   
    Content.update({_id:req.params.ContentId}, {$set: req.body}  )
    .exec()
   .then( result =>{
       console.log("data has been updated.");
       res.status(200).json(result);
   })
   .catch(err =>{
       console.log(err);
       res.status(500).json({error:err});
   });
 });

 router.delete('/:ContentId',(req,res,next)=> {
    Content.remove({_id:req.params.ContentId})
    .exec()
    .then( result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err});
    });
 });

router.post('/',(req,res,next)=> {
    const content =  new Content({
        _id : new mongoose.Types.ObjectId()
        ,name: req.body.name
        ,source: req.body.source
        ,type:req.body.type
    });
    content
        .save()
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message:"handling POST request",
                result : result
            });
        })
        .catch( err =>{
            console.log(err);
            res.status(500).json({error:err});
        });
});

 module.exports = router;