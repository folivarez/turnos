const Avisos = require('../models/aviso.models');
//var service = require('./service');
var jwt = require('jwt-simple');
var moment = require('moment');


exports.get_aviso = function(req, res) {
    Avisos.findOne({
        $or: [
            { 'tipo': req.params.id },
        ]
    }, function(err, data) {
        if (err) return next(err);
        res.send(data);
        //console.log(data.aviso);
        //console.log('devuelve todas las jornadas activas ' + data);
    })
};

exports.new_aviso = function(req, res) {
    var Aviso = new Avisos({
        aviso: req.body.aviso,
        activo: req.body.activo,
        tipo: req.body.tipo
    });


    Aviso.save()
        .then(item => {
            console.log('guardando aviso');
            res.send("aviso guardado");
        })
        .catch(err => {
            res.status(400).send("unable to save to database " + err);
            console.log(err);
        });
};

exports.update_aviso = function(req, res) {
    var tipo = req.body.tipo;
    console.log('actualizando aviso ' + tipo);
    var myquery = {
        tipo: tipo,
    };
    var newvalues = {
        $set: {
            aviso: req.body.aviso,
            activo: req.body.activo,
        }
    };
    Avisos.updateOne(myquery, newvalues, function(err, data) {
        if (err) throw err;
        console.log("se modifico aviso " + req.body.aviso);
        res.send('aviso ' + req.body.activo);
    });
};