const Jornadas = require('../models/jornada.models');
const Turno = require('../models/turno.models');
var format = require('date-format');
var moment = require('moment-timezone');



//Simple version, without validation or sanitation



exports.admin = function (req, res) {
    var jornadasActivas = { activa: true };
    var turnosSinConfirmar = {confirmado : ""};
    var turnosConfirmados = {confirmado : "1"};
    var turnosCancelados = {confirmado : "0"};

    Jornadas.find(jornadasActivas, function (err, data) {
        if (err) return next(err);
          
    Turno.find(turnosSinConfirmar, function (err, sinConfirmar) {
        if (err) return next(err);
    
    Turno.find(turnosConfirmados, function (err, confirmados) {
        if (err) return next(err);

    Turno.find(turnosCancelados, function (err, cancelados) {
        if (err) return next(err);
         
        

        var totalTurnosSinConfirmar = sinConfirmar.length;
        var totalTurnosConfirmados = confirmados.length;
        var cancelados = cancelados.length;

        if(cancelados == 0){
            totalTurnosCancelados = 0;
        }
        else{
            totalTurnosCancelados = cancelados;
        }

        var totalJornadas = data.length;



        res.render('admin/admin',  { 
            'jobs': data, 
            moment: moment,
            totalJornadas,
            totalTurnosSinConfirmar,
            totalTurnosConfirmados,
            totalTurnosCancelados
        });

          console.log('devuelve todas los turnos');
        console.log('devuelve todas los turnos cancelados ' + totalTurnosCancelados);
        console.log('devuelve todas los turnos confirmados ' + totalTurnosConfirmados);
        
    })

    })

    })
        console.log('devuelve todas las jornadas  para admin');

    }).sort({fecha: -1})
};








  

  

