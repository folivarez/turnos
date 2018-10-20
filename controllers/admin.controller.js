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
          
    Turno.find( function (err, data_turnos) {
        if (err) return next(err);
    
    
         
        
        var contTurnosSinConfirmar = 0;
        var totalTurnosSinConfirmar = 0;
        
        var contTurnosConfirmados = 0;
        var totalTurnosConfirmados = 0;
        
        var contTurnosCancelados = 0;
        var totalTurnosCancelados = 0;

       data_turnos.forEach (element => { 
            //console.log("---probando " + element);
            if (element.confirmado == "") {
                //console.log("---probando " + element);
                contTurnosSinConfirmar++;
            }
            else if (element.confirmado == 1) {
                contTurnosConfirmados++;

            }else if (element.confirmado == 0) {
                contTurnosCancelados++;

            }
        });
           
        totalTurnosSinConfirmar = contTurnosSinConfirmar;
        totalTurnosConfirmados = contTurnosConfirmados;
        totalTurnosCancelados = contTurnosCancelados;
       

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
        console.log('devuelve todas las jornadas  para admin');

    }).sort({fecha: -1})
};


exports.alta_jornada = function (req, res) {
    
  
        
        res.render('jornadas/crear_jornada',  {layout: false});
        


        console.log('devuelve todas las jornadas');
   
    
};







  

  

