const express  = require('express');
const router = express.Router();
const Content = require('../models/content');
const mongoose  = require('mongoose');
 
 
router.get('/',(req,res,next)=> {
    res.status(200).json({msg:"this is js content"});
});



 module.exports = router;