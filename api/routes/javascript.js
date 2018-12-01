const express  = require('express');
const router = express.Router();
const Js = require('../models/javascript');
const mongoose  = require('mongoose');

router.get('/',(req,res,next)=> {
    Js.find()
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

router.get('/:jsId',(req,res,next)=> {
    const id =  req.params.jsId;
    Js.findById(id)
        .exec()
        .then( doc =>{
            res.status(200).json(doc);
        })
        .catch( err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
});


router.patch('/:jsId',(req,res,next)=> {   
    Js.update({_id:req.params.jsId}, {$set: req.body}  )
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

 router.delete('/:jsId',(req,res,next)=> {
    Js.remove({_id:req.params.jsId})
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
    const js =  new Js({
        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        content: req.body.content

    });
    js.save()
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