const express  = require('express');
const app =  express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pageRoutes  =  require('./api/routes/page');
const jsRoutes  =  require('./api/routes/javascript');

mongoose.connect('mongodb://localhost/node-smager-up',
  {
    useNewUrlParser: true
  }
);
var db = mongoose.connection;
db.once('open', function(){
  console.log('connected to MongoDB');
});
db.once('error',function(){
  console.log(err);
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=> {
    res.header("Access-Control-Allow-Origin","*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method ==='OPTIONS'){
      req.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();

});

//Routes which should handle request
app.use('/page',  pageRoutes );
app.use('/js',  jsRoutes );


app.use((req,res,next)=> {
  const error  = new Error('Not found');
  error.status=404;
  next(error);
});

app.use((error,req,res,next)=> {
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message,
    }
  }); 
});


module.exports = app;