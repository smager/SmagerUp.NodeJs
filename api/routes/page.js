const express  = require('express');
const router = express.Router();
const Page = require('../models/page');
const mongoose  = require('mongoose');

router.get('/',(req,res,next)=> {
    Page.find()
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

router.get('/:pageId',(req,res,next)=> {
    const id =  req.params.pageId;
    Page.findById(id)
        .exec()
        .then( doc =>{
            res.status(200).json(doc);
        })
        .catch( err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
});


router.patch('/:pageId',(req,res,next)=> {   
    Page.update({_id:req.params.pageId}, {$set: req.body}  )
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

 router.delete('/:pageId',(req,res,next)=> {
    Page.remove({_id:req.params.pageId})
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
    const page =  new Page({
        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        content: req.body.content

    });
    page
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