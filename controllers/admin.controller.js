const Jornadas = require('../models/jornada.models');
const Turno = require('../models/turno.models');
var format = require('date-format');
var moment = require('moment-timezone');
var passport = require("passport");

 var cantAvisos = {};
 var aCantAvisos = [];


exports.admin = function(req, res) {
    console.log(req.user);
    console.log(req.session);
    let user = req.user;
    var jornadasActivas = {
        activa: true,
    };

    var idActivas = [];
    //var _avisos = {};
    

    var turnosSinConfirmar = { confirmado: "" };
    var turnosConfirmados = { confirmado: "1" };
    var turnosCancelados = { confirmado: "0" };

    

    Jornadas.find(jornadasActivas, function(err, data) {

        if (err) return next(err);
        data.forEach(element => {
            console.log('* ' + element._id);
            //cantidadAvisosPendientes(element._id);

            idActivas.push(element._id);

        });

        var inActivas = {
            jornada: { $in: idActivas },
        };

        Turno.find(inActivas, function(err, data_turnos) {
            if (err) return next(err);

            var contTurnosSinConfirmar = 0;
            var totalTurnosSinConfirmar = 0;

            var contTurnosConfirmados = 0;
            var totalTurnosConfirmados = 0;

            var contTurnosCancelados = 0;
            var totalTurnosCancelados = 0;

            data_turnos.forEach(element => {
                if (element.confirmado == "") {
                    contTurnosSinConfirmar++;
                } else if (element.confirmado == 1) {
                    contTurnosConfirmados++;

                } else if (element.confirmado == 0) {
                    contTurnosCancelados++;
                }
            });

            totalTurnosSinConfirmar = contTurnosSinConfirmar;
            totalTurnosConfirmados = contTurnosConfirmados;
            totalTurnosCancelados = contTurnosCancelados;

            var totalJornadas = data.length;
            
            console.log(aCantAvisos);
            
            

            res.status(200).render('admin/dashboard', {
                'jobs': data,
                user : user,
                moment: moment,
                totalJornadas,
                totalTurnosSinConfirmar,
                totalTurnosConfirmados,
                totalTurnosCancelados,
                aCantAvisos

                
            });
        })
    }).sort({ fecha: -1 })
};

async function cantidadAvisosPendientes(idJornada){

    console.log('**cuento avisos - ' + idJornada);
   

      var avisos = ''
            avisos = {
                jornada : idJornada,
                aviso : 0
            }

            console.log('**cantidad de avisos faltantes - ' + avisos.jornada + ' - ');

            Turno.count(avisos, function(err, count) {
                console.log('cantidad de avisos faltantes - ' + avisos.jornada + ' - ' + count);
                cantAvisos.jornadaId = idJornada;
                cantAvisos.cantidad = count;
                aCantAvisos.push(cantAvisos);

                
            });

            

}

exports.alta_jornada = function(req, res) {
    res.render('jornadas/crear_jornada', { layout: false });
};

exports.aviso_mensaje = function(req, res) {
    res.render('avisos/aviso_mensaje', { layout: false });
};

exports.cartel_web = function(req, res) {
    let user = req.user;
    res.render('avisos/cartel_web', { 
        layout: false,
        user:user,

    });
};