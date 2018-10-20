const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jornada = require('./routes/jornada.route'); // Imports routes for the products
const turno = require('./routes/turno.route'); 
const admin = require('./routes/admin.route'); 
const app = express()

//require('@google-cloud/debug-agent').start();

app.set('view engine', 'ejs');


//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/' ));

/*
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://userdb:Repiola87@dbcastraciones-9boem.gcp.mongodb.net/dbCastraciones?retryWrites=true";
MongoClient.connect(uri, function(err, client) {
   const collection = client.db("dbCastraciones").collection("Jornadas");
   // perform actions on the collection object
   client.close();
});
*/


//const dbURI =   "mongodb+srv://castracionesdb:castracionesdb@dbcastraciones-9boem.gcp.mongodb.net/dbCastraciones?retryWrites=true";  //cloud

const dbURI = "mongodb://castracionesdb:castracionesdb@dbcastraciones-shard-00-00-9boem.gcp.mongodb.net:27017,dbcastraciones-shard-00-01-9boem.gcp.mongodb.net:27017,dbcastraciones-shard-00-02-9boem.gcp.mongodb.net:27017/dbCastraciones?ssl=true&replicaSet=dbCastraciones-shard-0&authSource=admin&retryWrites=true";

//const dbURI =   "mongodb://localhost:27017/dbCastraciones";

const options = {
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

 
/*app.get('/castraciones', (req, res) => {
  //res.status(200).send("Bienvenido al sistema de turnos")
   res.render('index',  { });
})*/






app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/castraciones', jornada);
app.use('/castraciones', turno);
app.use('/castraciones/admin', admin);

 
http.createServer(app).listen(8080, () => {
  console.log('Server started at http://localhost:8080');
});

