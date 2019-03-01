var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Jornadas = require('../models/jornada.models');

var turno_schema = new Schema({
    nombre: String,
    telefono: String,
    mail: String,
    dni: String,
    jornada: String,
    hora: Date,
    animal: {
        tipo: String,
        peso: String,
        nombreMascota: String,
        cantidad: String,
        preniado: String
    },
    aviso: Number,
    confirmado: String,
    asistio: String,
    reserva: Date,
    response_mail: String,
    postoperatorio: String,
});

module.exports = mongoose.model('Turnos', turno_schema, 'Turnos');