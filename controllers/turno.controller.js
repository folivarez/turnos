const Turno = require('../models/turno.models');
const Veterinarios = require('../models/veterinario.models');
var format = require('date-format');
var moment = require('moment-timezone');
//var nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const Jornadas = require('../models/jornada.models');
const reel = require('node-reel');


var _localidad;
var _precio;
var _fecha;
var _direparcial;
var _hora;

var _contador;
var _grupo;
var i;
var turno;

exports.turno = function(req, res) {
    Turno.find(function(err, data) {

        if (err) return next(err);
        res.render('turnos/turno', {});
    })
};

exports.turnoLista = function(req, res) {
    let user = req.user;
    Turno.find(function(err, data) {

        if (err) return next(err);

        res.render('turnos/turnoLista', {
            'jobs': data,
            user:user,
            moment: moment
        });
    })
};

//crear turno
exports.turno_create = function(req, res) {
    try {
        altaDeTurno(req, res);
    } catch (error) {
        console.error("error obtener jornada " + error);
    }
};


function actualizar_hora_jornada(idJornada, hora) {
    var myquery = {
        _id: idJornada,
    };

    var newvalues = {
        $set: {

            hora_prox_turno: hora,
        }
    };
    Jornadas.updateOne(myquery, newvalues, function(err, data) {
        if (err) throw err;
    });
}

function actualizar_contador_jornada(idJornada, contador) {
    var myquery = {
        _id: idJornada,
    };

    var newvalues = {
        $set: {
            cont: contador,
        }
    };
    Jornadas.updateOne(myquery, newvalues, function(err, data) {
        if (err) throw err;
    });
}


function sumar_mediahora(hora) {
    //var hora_final = moment(hora).add(30, 'minutes').format('HH:mm');
    //return hora_final;
    return moment(hora).add(30, 'minutes').format('HH:mm');
}


exports.btnConfirmarTurno = function(req, res) {

    var id = req.body.idTurno;
    var id_final = '';
    var idAux = id.substr(-3); //id.slice(0, -3)
    var idAux1 = id.substr(-1); //id.slice(0, -3)

    if (idAux == '%20') {
        id_final = id.slice(0, -3);
    } else if (idAux1 == '+') {
        id_final = id.slice(0, -1);
    } else {
        id_final = id;
    }

    var myquery = { _id: id_final };
    var newvalues = { $set: { confirmado: 1 } };

    Turno.findById(myquery, function(err, _cliente) {
        if (_cliente != undefined) {
            console.log('reconozco cliente ' + _cliente.nombre);
            Jornadas.findById(_cliente.jornada, function(err, jor) {
                if (_cliente.confirmado == '') {
                    try {
                        Turno.findOneAndUpdate(myquery, newvalues, function(err, cli) {});

                        res.send('Turno Confirmado');
                    } catch (err) {
                        console.error("Error al confirmar " + id_final + " Turno con error " + err);
                        res.render('turnos/errorTurno', {
                            moment: moment
                        });
                    }
                } else {
                    res.send('Turno Confirmado');
                }
            });
        } else {
            console.log('cliente no existe');
            res.send('cliente no existe');
        }
    });
};

exports.confirmarTurno = function(req, res) {

    var id = req.params.id;
    var id_final = '';
    var idAux = id.substr(-3); //id.slice(0, -3)
    var idAux1 = id.substr(-1); //id.slice(0, -3)

    if (idAux == '%20') {
        id_final = id.slice(0, -3);
    } else if (idAux1 == '+') {
        id_final = id.slice(0, -1);
    } else {
        id_final = id;
    }

    var myquery = { _id: id_final };
    var newvalues = { $set: { confirmado: 1 } };

    Turno.findById(myquery, function(err, _cliente) {

        if (_cliente != undefined) {
            console.log('reconozco cliente ' + _cliente.nombre);
            Jornadas.findById(_cliente.jornada, function(err, jor) {

                Veterinarios.findOne({$or:[{ 'nombre': jor.veterinario },]}, function(err, veterinario) {
  
                    res.render('turnos/confirmarTurno', {
                        'cliente': _cliente,
                        'jornada': jor,
                        'veterinario': veterinario,
                        moment: moment,
                    });
                });
            });
        } else {
            console.log('cliente no existe');
            res.send('cliente no existe');
        }
    });
};

exports.cancelar_turno = function(req, res) {
    var id = req.params.id;
    var id_final = '';
    var idAux = id.substr(-3); //id.slice(0, -3)
    var idAux1 = id.substr(-1); //id.slice(0, -3)

    if (idAux == '%20') {
        id_final = id.slice(0, -3);
    } else if (idAux1 == '+') {
        id_final = id.slice(0, -1);
    } else {
        id_final = id;
    }

    var myquery = {
        _id: id_final,
    };

    var newvalues = {
        $set: {
            confirmado: 0,
        }
    };

    Turno.findOneAndUpdate(myquery, newvalues, function(err, data) {
        try {
            res.render('turnos/cancelarTurno', {
                'jobs': data,
                moment: moment
            });
            console.log("Se cancela el turno " + id_final);
        } catch (err) {
            console.error("Error al cancelar Turno " + err);
        }
    });
};


exports.envio_turno = function(req, res) {
    var id = req.body.idJornada;
    var id_final = '';
    var idAux = id.substr(-3); //id.slice(0, -3)
    var idAux1 = id.substr(-1); //id.slice(0, -3)

    if (idAux == '%20') {
        id_final = id.slice(0, -3);
    } else if (idAux1 == '+') {
        id_final = id.slice(0, -1);
    } else {
        id_final = id;
    }

    var myquery = {
        _id: id_final,
    };

    var newvalues = {
        $set: {
            aviso: 2,
        }
    };

    Turno.findOneAndUpdate(myquery, newvalues, function(err, data) {
        try {
            console.log("Se envia aviso " + id_final);
        } catch (err) {
            console.error("Error al enviar aviso " + err);
        }
        res.send("Aviso enviado");
    });
};


async function altaDeTurno(req, res) {

    let check_telefono = {
            jornada: req.body.jornada,
            telefono: req.body.telefono,
        };
        //console.log('check DNI ' + check_dni.dni);

    Turno.countDocuments(check_telefono, function(err, turno) {

        console.log('turnos devueltos ' + turno); //verificar si piden detallar animales
            if (!turno || turno < 3) {
                
                console.log('Guardar turno ' + turno);
                _hora = "";
                var hora_nueva;
                _contador = 0;
                idJornadaSelec = req.body.jornada;

                Jornadas.findById(idJornadaSelec, function(err, jor) {
                    if (err) return next(err);

                    _localidad = jor.localidad;
                    _precio = jor.precio;
                    _fecha = jor.fecha;
                    _hora = jor.hora_prox_turno;
                    _direparcial = jor.direparcial;
                    _grupo = jor.cant_grupo;
                    _contador = jor.cont;

                    if (_contador >= _grupo) {
                        actualizar_contador_jornada(idJornadaSelec, 1);
                        hora_nueva = moment(_hora).add(30, 'minutes');
                        actualizar_hora_jornada(idJornadaSelec, hora_nueva);
                    } else {
                        hora_nueva = _hora;
                        i = _contador + 1;
                        actualizar_contador_jornada(idJornadaSelec, i.toString());
                    }
                    var turno = new Turno({
                        nombre: req.body.nombre,
                        telefono: req.body.telefono,
                        mail: '',
                        dni: req.body.dni,
                        jornada: req.body.jornada,
                        hora: hora_nueva,
                        animal: {
                            tipo: req.body.tipo,
                            peso: req.body.peso,
                            nombreMascota: req.body.nombreMascota,
                            cantidad: req.body.cantidad,
                            preniado: req.body.preniado
                        },
                        aviso: req.body.aviso,
                        confirmado: '',
                        asistio: '',
                        reserva: req.body.reserva
                    });

                        turno.save().then(item => {
                            res.status(200).send("guardando turno en database");
                        })
                        .catch(err => {
                            res.status(400).send("unable to save to database " + err);
                            console.log(err);
                        });
                });
                return hora_nueva;
            }
            else{
                res.status(202).send(req.body.nombre);
            }
    });

    
}

exports.presente = function(req, res) {
    var id = req.body.idTurno;
    var estado = req.body.estado;
    var myquery = {
        _id: id,
    };
    var estadoPersona = 0;
    if (estado == 'presente') {
        estadoPersona = '';
    } else {
        estadoPersona = 1;
    }

    var newvalues = {
        $set: {
            asistio: estadoPersona,
        }
    };

    Turno.findOneAndUpdate(myquery, newvalues, function(err, data) {

        try {
            console.log("estadoPersona " + estadoPersona);
        } catch (err) {
            console.error("Error al dar presente " + err);
        }
        res.send("Presente");

    });

};