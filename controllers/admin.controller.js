const Jornadas = require('../models/jornada.models');
const Turno = require('../models/turno.models');
var format = require('date-format');
var moment = require('moment-timezone');
var passport = require("passport");


exports.admin = function(req, res) {
    console.log(req.user);
    console.log(req.session);
    let user = req.user;
    var jornadasActivas = {
        activa: true,
    };

    var idActivas = [];
    //var _avisos = {};
    var cantAvisos = {};
    var jornadaId = '';

    var turnosSinConfirmar = { confirmado: "" };
    var turnosConfirmados = { confirmado: "1" };
    var turnosCancelados = { confirmado: "0" };

    var avisos = '';
    var aIndex = [];

    Jornadas.find(jornadasActivas, function(err, data) {
        var i = 0
        var id = '';
        console.log('length ' + data.length);
        if (err) return next(err);

          for ( i ; i <= data.length - 1; i++) {
            
           
            idActivas.push( Object(data[i]._id));

        };

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
            
            

            res.status(200).render('admin/dashboard', {
                'jobs': data,
                user : user,
                moment: moment,
                totalJornadas,
                totalTurnosSinConfirmar,
                totalTurnosConfirmados,
                totalTurnosCancelados,
            });
        })
    }).sort({ fecha: -1 })
};

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


exports.cantidadDeTurnos = function(req, res) {
        let user = req.user;
        var start = moment().startOf('day'); // set to 12:00 am today
        var end = moment().endOf('day'); 

        var fecha = [
                        {$match: {reserva: {$gte: new Date(start), $lt: new Date(end)}}},
                        {"$group" : {_id:"$jornada", count:{$sum:1}}}
                        ];

        var activas = {activa: true};
        var  inJornadas = [];
        var jornadasNombre = {};
        
        Turno.aggregate(fecha, function(err, turnosPorJornada) {
            if (err) return next(err);
                        
            turnosPorJornada.forEach(element =>{
                inJornadas.push(element._id);
                
            });

            let jornadaBuscadas = {
                _id: { $in: inJornadas },
            };

            //console.log('--------------------------------------------------');  
            var jornada_agrupada = {};

            Jornadas.find(jornadaBuscadas, function(err, data_jornadas) {
                if (err) return next(err);

               
                res.send( {'jornadas':data_jornadas,
                           'turnosporjornada':turnosPorJornada,
                           start,end
                            });
                
            }).sort({ _id: -1 });
        }).sort({ jornada: -1 });
};

exports.cantidadDeTurnosView = function(req, res) {
        let user = req.user;

        res.render('jornadas/jornada_graficos', {
            layout: false,
            moment: moment,
            user:user,
        });
       
};

