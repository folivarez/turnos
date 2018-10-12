const Jornadas = require('../models/jornada.models');
const Turno = require('../models/turno.models');
var format = require('date-format');
var moment = require('moment-timezone');



//Simple version, without validation or sanitation

exports.jornadas = function (req, res) {
    var myquery = { activa: true };

    Jornadas.find(myquery, function (err, data) {
        if (err) return next(err);
        //res.send(jornada);
        //res.render('jornadas/index');

        res.render('../index',  { 
            'jobs': data, 
            moment: moment 
        });


        console.log('devuelve todas las jornadas activas');
    })
};


exports.lista = function (req, res) {
    
    Jornadas.find( function (err, data) {
        if (err) return next(err);
        //res.send(jornada);
        //res.render('jornadas/index');
        
        res.render('jornadas/index',  { 
        	'jobs': data, 
        	moment: moment 
        });
        


        console.log('devuelve todas las jornadas');
    });
    
};

// controllers/products.js
exports.jornada_create = function (req, res) {

   

   var Jornada = new Jornadas(
        {
            localidad: req.body.localidad,
            fecha: moment(req.body.fecha).toISOString(),
            direccion: req.body.direccion,
            direparcial: req.body.direparcial,
            precio: req.body.precio,
            cant_grupo : req.body.cant_grupo,
            hora_prox_turno: req.body.hora_prox_turno,
            cont: req.body.cont,

            activa: req.body.activa
        }
    );

    //var jornada = new Jornada(req.body);

    Jornada.save()
    .then(item => {
      console.log(req.body);
      console.log('fecha ' +  moment(req.body.fecha).tz("America/Argentina/Buenos_Aires").format("dddd, MMMM Do YYYY, h:mm:ss a"))
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database " + err);
    });
    
};




exports.jornada_details = function (req, res) {
    Jornadas.findById(req.params.id, function (err, jornada) {
        if (err) return next(err);
        //res.send(jornada);
       
        var myquery = { jornada: req.params.id };

        Turno.find(myquery, function (err, turnos) {

        if (err) return next(err);
        //res.send(jornada);
        //res.render('jornadas/index');
        var totalTurnos = turnos.length;

        res.render('jornadas/idjornada',  { 
            jornada,
            moment,
            'turnosLista' : turnos,
            totalTurnos

        });

        console.log('consola de turno');
        });

       
    });
};

exports.jornada_hora = function (req, res) {
    Jornadas.findById(req.params.id, function (err, jornada) {
        if (err) return next(err);
        //res.send(jornada);
        res.send(jornada);
    })
};


exports.jornada_delete = function (req, res) {
    Jornadas.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};


exports.jornada_update_turno = function (req, res) {

    var myquery = { 
                        _id: req.body.id,
                  };
    
    var newvalues = {
                        $set: {
                                cont: 1,
                                precio: "900",
                              } 

                    };
    Jornadas.updateOne(myquery, newvalues, function(err, data) {
    if (err) throw err;
    console.log("Se actualizo un registro " + req.body.id);
    res.send('Update successfully!');
    
    });
};






  

  

