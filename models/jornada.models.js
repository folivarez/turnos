var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var jornada_schema = new Schema({  
	
    localidad: {type: String},
  	fecha:     {type: Date},
  	direccion: {type: String},
  	direparcial: {type: String},
  	precio: {type: String},
  	cant_grupo : {type: Number},
  	hora_prox_turno : {type: Date},
  	cont : {type: Number},
  	activa:    {type: Boolean},
 });



 
module.exports = mongoose.model('Jornadas', jornada_schema, 'Jornadas');

