require('dotenv').config()
const express = require('express');
var passport = require('passport');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
//var cookieParser = require('cookie-parser');
const http = require('http')
const mongoose = require('mongoose')
//const bodyParser = require('body-parser')
const jornada = require('./routes/jornada.route'); // Imports routes for the products
const turno = require('./routes/turno.route'); 
const admin = require('./routes/admin.route'); 
const login = require('./routes/login.route'); 

const reel = require('node-reel');
const app = express()
var back = require('express-back');

const MongoStore = require('connect-mongo')(session);
require('@google-cloud/debug-agent').start();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/' ));

const dbURI = "mongodb://castracionesdb:castracionesdb@dbcastraciones-shard-00-00-9boem.gcp.mongodb.net:27017,dbcastraciones-shard-00-01-9boem.gcp.mongodb.net:27017,dbcastraciones-shard-00-02-9boem.gcp.mongodb.net:27017/dbCastraciones?ssl=true&replicaSet=dbCastraciones-shard-0&authSource=admin&retryWrites=true";
//const dbURI =   "mongodb://localhost:27017/dbCastraciones";

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  dbName: 'dbCastraciones'
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({

    secret: 'eminem', // session secret
    resave: true,
    saveUninitialized: true,
    //maxAge: 604800000,
    //cookie: { _expires: (60 * 60 * 1000) },  // 30 
    //store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(back());

app.use('/castraciones', jornada);
app.use('/castraciones', turno);
app.use('/castraciones', login);
//app.use('/castraciones/admin', admin);
app.use('/castraciones', admin);
 
http.createServer(app).listen(8080, () => {
  console.log('Server started at http://localhost:8080');
  //console.log(process.env);
});



module.exports = app;