const Veterinarios = require('../models/veterinario.models');
var jwt = require('jwt-simple');
var moment = require('moment');



exports.new_veterinario = function(req, res) {
    var Veterinario = new Veterinarios({
        nombre: req.body.nombre,
        puntos: req.body.puntos,
        adicional: req.body.adicional,
        activo: req.body.activo
    });


    Veterinario.save()
        .then(item => {
            console.log('guardando veterinario');
            res.send("veterinario guardado");
        })
        .catch(err => {
            res.status(400).send("error al guardar veterinario " + err);
            console.log(err);
        });
};


exports.lista = function(req, res) {
    let user = req.user;
    Veterinarios.find(function(err, data) {
        if (err) return next(err);
        res.render('veterinarios/veterinarios', {
            'lista': data,
            user:user,
            moment: moment
        });
    });
};

exports.listaCombo = function(req, res) {
    let user = req.user;
    Veterinarios.find(function(err, data) {
        if (err) return next(err);
        res.render('jornadas/crear_jornada', {
            'lista': data,
            user:user,
            moment: moment
        });
    });
};

exports.veterinario_delete = function(req, res) {
    Veterinarios.findByIdAndRemove(req.body.id, function(err) {
        if (err) return next(err);
        res.send('Veterinario eliminar correctamente!');
    })
};

exports.veterinario_por_nombre = function(req, res) {
     Veterinarios.findOne({
        $or: [
            { 'nombre': req.body.nombre },
        ]
    }, function(err, data) {
        if (err) return next(err);
        res.send(data);
    })
};