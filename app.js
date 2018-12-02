const express  = require('express');
const app =  express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require("express-handlebars");
const path =  require("path");

var contentRoutes  =  require('./api/routes/content');
var jsRoutes  =  require('./api/routes/javascript');
var pgRoutes  =  require('./api/routes/page');

global.appName = "Node-SmagerUp";

//view engin setup
app.engine("hbs",hbs({extname:"hbs",defaultLayout:"layout",layoutsDir: __dirname + "/views/layouts/"}));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","hbs");

mongoose.connect('mongodb://localhost/node-smager-up',
  {
    useNewUrlParser: true
  }
);
var db = mongoose.connection;
db.once('open', function(){
  console.log('connected to MongoDB');
});
db.once('error',function(err){
  console.log("Database connection error message:",err);
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true})) 
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
app.use('/content',  contentRoutes );
app.use('/js',  jsRoutes );
app.use('/pg',  pgRoutes );

app.use('/public',express.static('public'));

app.use('/',(req,res,next)=> {  
   res.render("home",{ layout: 'home-layout',appName:appName });   
});

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