var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var aviso_schema = new Schema({  
	
    aviso: String,
    activo: Boolean,
    tipo: String,
 });



 
module.exports = mongoose.model('Avisos', aviso_schema, 'Avisos');



