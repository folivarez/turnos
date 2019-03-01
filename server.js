require('dotenv').config()
const express = require('express');
var passport = require('passport');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
const http = require('http');
const mongoose = require('mongoose')
const jornada = require('./routes/jornada.route'); // Imports routes for the products
const turno = require('./routes/turno.route'); 
const admin = require('./routes/admin.route'); 
const login = require('./routes/login.route'); 

const reel = require('node-reel');
const app = express()
var back = require('express-back');

const MongoStore = require('connect-mongo')(session);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/' ));

const dbURI = process.env.DB ;

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  dbName: process.env.DBNAME
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


app.use(session({

    secret: process.env.SECRET, // session secret
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
app.use('/castraciones', admin);
 
http.createServer(app).listen(process.env.PORT, () => {
  console.log('Server started');
});

module.exports = app;