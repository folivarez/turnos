
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://userdb:liraKom87*@dbcastraciones-9boem.gcp.mongodb.net/dbCastraciones?retryWrites=true';


//MongoClient.connect(url, {useNewUrlParser: true },function(err, database) {
MongoClient.connect(url, {useNewUrlParser: true }, (error, database) => {
  if (error) return process.exit(1);
  console.log('Connection is okay');

  const db = database.db('dbCastraciones');
  /*var cursor = db.collection('Jornadas').find();

    cursor.forEach(function(err, doc) {

     console.log(doc);
  });*/
});
