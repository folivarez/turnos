const Jornadas = require('../models/jornada.models');
const Turno = require('../models/turno.models');
const Veterinarios = require('../models/veterinario.models');
var format = require('date-format');
var moment = require('moment-timezone');


exports.jornadas = function(req, res) {
    var myquery = { activa: true };

    Jornadas.find(myquery, function(err, data) {
        if (err) return next(err);
        var totalJornadas = data.length;

        res.render('../index', {
            'jobs': data,
            moment: moment
        });
        //console.log('devuelve todas las jornadas activas ' + data);
    }).sort({ fecha: 1 })
};

exports.jornadasFecha = function(req, res) {
    var myquery = { activa: true };

    Jornadas.findOne(myquery, function(err, data) {
        if (err) return next(err);
        var totalJornadas = data.length;

        res.send(data.fecha);
        //console.log('devuelve todas las jornadas activas ' + data);
    }).sort({ fecha: 1 })
};

exports.jornada_id = function(req, res) {
    let user = req.user;
    console.log('llegue a jornada id ' + req.query.id);
    Jornadas.findById(req.query.id, function(err, jornada) {
        if (err) return next(err);
        Veterinarios.find(function(err, data) {
            res.render('jornadas/jornada_update', {
                data,
                'jornada': jornada,
                user:user,
                moment: moment
            });    
        })
    })
};

exports.listaCompleta = function(req, res) {
    let user = req.user;
    Jornadas.find(function(err, data) {
        if (err) return next(err);
        res.render('jornadas/jornadas', {
            'jobs': data,
            user:user,
            moment: moment
        });
    }).sort({ fecha: -1 });

};

exports.jornada_create = function(req, res) {

    var Jornada = new Jornadas({
        localidad: req.body.localidad,
        fecha: moment(req.body.fecha).toISOString(),
        direccion: req.body.direccion,
        direparcial: req.body.direparcial,
        precio: req.body.precio,
        cant_grupo: req.body.cant_grupo,
        hora_prox_turno: req.body.hora_prox_turno,
        cont: req.body.cont,
        completa: req.body.completa,
        activa: req.body.activa,
        veterinario: req.body.veterinario,
        observacion: req.body.observacion,
    });

    Jornada.save()
        .then(item => {
            console.log(req.body);
            console.log('fecha ' + moment(req.body.fecha).format("dddd, MMMM Do YYYY, h:mm:ss a"))
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database " + err);
        });
};




exports.jornada_details = function(req, res) {
    var user = req.user;
    Jornadas.findById(req.query.id, function(err, jornada) {
        if (err) return next(err);

        var myquery = { jornada: req.query.id };
        console.log('dispositivo ' + req.query.device);

        Turno.find(myquery, function(err, turnos) {
            if (err) return next(err);
            var totalTurnos = turnos.length;

            var contTurnosSinConfirmar = 0;
            var totalTurnosSinConfirmar = 0;

            var contTurnosConfirmados = 0;
            var totalTurnosConfirmados = 0;

            var contTurnosCancelados = 0;
            var totalTurnosCancelados = 0;

            var contPerros = 0;
            var totalPerros = 0;

            var contPerras = 0;
            var totalPerras = 0;

            var contGatos = 0;
            var totalGatos = 0;

            var contGatas = 0;
            var totalGatas = 0;

            turnos.forEach(element => {
                //console.log("---probando " + element.animal.cantidad);
                if (element.confirmado == "") {
                    //console.log("---probando " + element);
                    contTurnosSinConfirmar++;
                } else if (element.confirmado == 1) {

                    contTurnosConfirmados++;

                    if (element.animal.tipo == "PERRO") {
                        //console.log("---probando " + element);
                        contPerros++;
                    } else if (element.animal.tipo == "PERRA") {
                        contPerras++;

                    } else if (element.animal.tipo == "GATO") {
                        contGatos++;

                    } else if (element.animal.tipo == "GATA") {
                        contGatas++;
                    }
                } else if (element.confirmado == 0) {
                    contTurnosCancelados++;
                }
            });

            totalPerros = contPerros;
            totalPerras = contPerras;
            totalGatos = contGatos;
            totalGatas = contGatas;

            totalTurnosSinConfirmar = contTurnosSinConfirmar;
            totalTurnosConfirmados = contTurnosConfirmados;
            totalTurnosCancelados = contTurnosCancelados;

            if (req.query.device == 'pc') {

                res.render('jornadas/jornada_turnos', {
                    jornada,
                    moment,
                    'turnosLista': turnos,
                    totalTurnos,
                    totalTurnosSinConfirmar,
                    totalTurnosConfirmados,
                    totalTurnosCancelados,
                    totalPerros,
                    totalPerras,
                    totalGatos,
                    totalGatas,
                    user,
                });
            } 
            else {

                res.render('jornadas/jornada_turnos_mobile', {
                    jornada,
                    moment,
                    'turnosLista': turnos,
                    totalTurnos,
                    totalTurnosSinConfirmar,
                    totalTurnosConfirmados,
                    totalTurnosCancelados,
                    totalPerros,
                    totalPerras,
                    totalGatos,
                    totalGatas,
                    user,
                });
            }


            console.log('consola de turno');
        });
    });
};

exports.jornada_hora = function(req, res) {
    Jornadas.findById(req.params.id, function(err, jornada) {
        if (err) return next(err);
        res.send(jornada);
    })
};

exports.jornada_delete = function(req, res) {
    Jornadas.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.jornada_update_estado = function(req, res) {
    var myquery = {
        _id: req.body.id,
    };

    var newvalues = {
        $set: {

            activa: false,
        }

    };
    Jornadas.updateOne(myquery, newvalues, function(err, data) {
        if (err) throw err;
        console.log("Se suspendio la jornada " + req.body.id);
        res.send('Suspendida successfully!');

    });
};

exports.jornada_update_completa = function(req, res) {

    var myquery = {
        _id: req.body.id,
    };

    var newvalues = {
        $set: {
            completa: "1",
        }
    };
    Jornadas.updateOne(myquery, newvalues, function(err, data) {
        if (err) throw err;
        console.log("Se bloqueo la jornada " + req.body.id);
        res.send('Bloqueada successfully!');

    });
};

exports.jornada_update_all = function(req, res) {
    console.log(req.body.id + ' - ' + req.body.localidad);
    var myquery = {
        _id: req.body.id,
    };

    var newvalues = {
        $set: {
            localidad   : req.body.localidad,
            direccion   : req.body.direccion,
            direparcial : req.body.direparcial,
            precio      : req.body.precio,
            cant_grupo  : req.body.cant_grupo,
            veterinario : req.body.veterinario,
            observacion : req.body.observacion,
        }
    };
    Jornadas.updateOne(myquery, newvalues, function(err, data) {
        if (err) throw err;
        console.log("Se modifico la jornada " + req.body.id);
        res.send('Modified successfully!');
    });
};