var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var veterinario_schema = new Schema({  
	
    nombre: String,
    puntos: String,
    adicional: String,
    activo: String,
 });
 
module.exports = mongoose.model('Veterinario', veterinario_schema, 'Veterinario');


