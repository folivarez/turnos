const Turno = require('../models/turno.models');
var format = require('date-format');
var moment = require('moment');
var nodemailer = require('nodemailer');
const Jornadas = require('../models/jornada.models');



//Simple version, without validation or sanitation

exports.turno = function (req, res) {
    Turno.find( function (err, data) {

        if (err) return next(err);
        //res.send(jornada);
        //res.render('jornadas/index');

        res.render('turnos/turno',  {});

        console.log('consola de turno');
    })
};

exports.turnoLista = function (req, res) {
    Turno.find( function (err, data) {

        if (err) return next(err);
        //res.send(jornada);
        //res.render('jornadas/index');

        res.render('turnos/turnoLista',  { 
            'jobs': data, 
            moment: moment 
        });


        console.log('devuelve todas los turnos');
    })
};

//crear turno
exports.turno_create = function (req, res) {

var turno = new Turno({
                nombre : req.body.nombre,
                telefono : req.body.telefono,
                mail : req.body.mail,
                dni : req.body.dni,
                jornada :    req.body.jornada , 
                hora: "",       
                animal  : {
                            tipo : req.body.tipo,
                            peso : req.body.peso,
                            cantidad : req.body.cantidad,
                            preniado : req.body.preniado
                        },
                confirmado : '',
                asistio  : ''
            }
);


var idJornadaSelec = turno.jornada;
var _localidad;
var _precio;
var _fecha;
var _direparcial;
var _hora;
var hora_nueva;
var _contador;
var _grupo;
var i;


Jornadas.findById(idJornadaSelec, function (err, jornada) {
        if (err) return next(err);
        //res.send(jornada);
        console.log("--obtengo jornada " + jornada.id);
        _localidad = jornada.localidad;
        _precio = jornada.precio;
        _fecha = jornada.fecha;
        _hora = jornada.hora_prox_turno;
        _direparcial = jornada.direparcial;
        _grupo = jornada.cant_grupo;
        _contador = jornada.cont;
       
});


    turno.save().then(item => {
        
      

      try {
          res.send("guardando turno en database ");

          if (_contador >= _grupo) {
            actualizar_contador_jornada(idJornadaSelec, 0);
            
            console.log("hora antes de sumar " + moment(_hora).format('HH:mm'));
            hora_nueva = moment(_hora).add(30, 'minutes');
            console.log("hora sumada " + moment(hora_nueva).format('HH:mm'));
            actualizar_hora_jornada(idJornadaSelec, hora_nueva);
            }
            else{
                hora_nueva = _hora;
                i = _contador + 1;
                //console.log("valor de i " + i);
                actualizar_contador_jornada(idJornadaSelec,i.toString());
            }
            actualizar_hora_turno(item.id, hora_nueva);
            console.log("Mandando mail " + turno.mail + ' - ' + turno.nombre + ' - ' + _localidad, _precio + ' - ' + moment(_fecha).format('D/M/YYYY') + ' - ' + moment(hora_nueva).format('HH:mm') + ' - ' + _direparcial, turno.id);


             mail_confirmacion(turno.mail, turno.nombre, _localidad, _precio, moment(_fecha).format('D/M/YYYY'), moment(hora_nueva).format('HH:mm'), _direparcial, turno.id);
        }
        catch(error) {
          console.error(error);
         
        }
      

        
    })
    .catch(err => {
      res.status(400).send("unable to save to database " + err);
    });
    
};


function mail_confirmacion(destino, nombre, localidad, precio,  fecha, hora, direparcial, idTurno) {
   
    //console.log("Mandando mail " + destino + ' - ' + nombre + ' - ' + precio + ' - ' + fecha + ' - ' + hora + ' - ' + direparcial);

    var transporter = nodemailer.createTransport({
        service: 'localhost'
    });

    var mailOptions = {
            from: 'no-reply@castraciones.com.ar',
            to: destino,
            subject: 'Castracion - Se requiere confirmacion!',
            text: 'Hola , usted solicito un turno para la jornada de castracion Florencio Varela 22/10/2018,\n' +
            'Se le otorgara un turno para las 09:00 hs\n' +
            'Zona: a 4 cuadras del centro (la direccion exacta se brindara 48hs antes por mail)\n\n' +
            'Muchas Gracias',
            html: '<!doctype html><html>  <head><meta name="viewport" content="width=device-width" /><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>Simple Transactional Email</title><style>  /* -------------------------------------  GLOBAL RESETS  ------------------------------------- */  img {border: none;-ms-interpolation-mode: bicubic;max-width: 100%; }  body {background-color: #f6f6f6;font-family: sans-serif;-webkit-font-smoothing: antialiased;font-size: 14px;line-height: 1.4;margin: 0;padding: 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%; }  table {border-collapse: separate;mso-table-lspace: 0pt;mso-table-rspace: 0pt;width: 100%; }table td {  font-family: sans-serif;  font-size: 14px;  vertical-align: top; }  /* -------------------------------------  BODY & CONTAINER  ------------------------------------- */  .body {background-color: #f6f6f6;width: 100%; }  /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */  .container {display: block;Margin: 0 auto !important;/* makes it centered */max-width: 580px;padding: 10px;width: 580px; }  /* This should also be a block element, so that it will fill 100% of the .container */  .content {box-sizing: border-box;display: block;Margin: 0 auto;max-width: 580px;padding: 10px; }  /* -------------------------------------  HEADER, FOOTER, MAIN  ------------------------------------- */  .main {background: #ffffff;border-radius: 3px;width: 100%; }  .wrapper {box-sizing: border-box;padding: 20px; }  .content-block {padding-bottom: 10px;padding-top: 10px;  }  .footer {clear: both;Margin-top: 10px;text-align: center;width: 100%; }.footer td,.footer p,.footer span,.footer a {  color: #999999;  font-size: 12px;  text-align: center; }  /* -------------------------------------  TYPOGRAPHY  ------------------------------------- */  h1,  h2,  h3,  h4 {color: #000000;font-family: sans-serif;font-weight: 400;line-height: 1.4;margin: 0;margin-bottom: 30px; }  h1 {font-size: 35px;font-weight: 300;text-align: center;text-transform: capitalize; }  p,  ul,  ol {font-family: sans-serif;font-size: 14px;font-weight: normal;margin: 0;margin-bottom: 15px; }p li,ul li,ol li {  list-style-position: inside;  margin-left: 5px; }  a {color: #3498db;text-decoration: underline; }  /* -------------------------------------  BUTTONS  ------------------------------------- */  .btn {box-sizing: border-box;width: 100%; }.btn > tbody > tr > td {  padding-bottom: 15px; }.btn table {  width: auto; }.btn table td {  background-color: #ffffff;  border-radius: 5px;  text-align: center; }.btn a {  background-color: #ffffff;  border: solid 1px #3498db;  border-radius: 5px;  box-sizing: border-box;  color: #3498db;  cursor: pointer;  display: inline-block;  font-size: 14px;  font-weight: bold;  margin: 0;  padding: 12px 25px;  text-decoration: none;  text-transform: capitalize; }  .btn-primary table td {background-color: #3498db; }  .btn-primary a {background-color: #3498db;border-color: #3498db;color: #ffffff; }  /* -------------------------------------  OTHER STYLES THAT MIGHT BE USEFUL  ------------------------------------- */  .last {margin-bottom: 0; }  .first {margin-top: 0; }  .align-center {text-align: center; }  .align-right {text-align: right; }  .align-left {text-align: left; }  .clear {clear: both; }  .mt0 {margin-top: 0; }  .mb0 {margin-bottom: 0; }  .preheader {color: transparent;display: none;height: 0;max-height: 0;max-width: 0;opacity: 0;overflow: hidden;mso-hide: all;visibility: hidden;width: 0; }  .powered-by a {text-decoration: none; }  hr {border: 0;border-bottom: 1px solid #f6f6f6;Margin: 20px 0; }  /* -------------------------------------  RESPONSIVE AND MOBILE FRIENDLY STYLES  ------------------------------------- */  @media only screen and (max-width: 620px) {table[class=body] h1 {  font-size: 28px !important;  margin-bottom: 10px !important; }table[class=body] p,table[class=body] ul,table[class=body] ol,table[class=body] td,table[class=body] span,table[class=body] a {  font-size: 16px !important; }table[class=body] .wrapper,table[class=body] .article {  padding: 10px !important; }table[class=body] .content {  padding: 0 !important; }table[class=body] .container {  padding: 0 !important;  width: 100% !important; }table[class=body] .main {  border-left-width: 0 !important;  border-radius: 0 !important;  border-right-width: 0 !important; }table[class=body] .btn table {  width: 100% !important; }table[class=body] .btn a {  width: 100% !important; }table[class=body] .img-responsive {  height: auto !important;  max-width: 100% !important;  width: auto !important; }}  /* -------------------------------------  PRESERVE THESE STYLES IN THE HEAD  ------------------------------------- */  @media all {.ExternalClass {  width: 100%; }.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {  line-height: 100%; }.apple-link a {  color: inherit !important;  font-family: inherit !important;  font-size: inherit !important;  font-weight: inherit !important;  line-height: inherit !important;  text-decoration: none !important; }.btn-primary table td:hover {  background-color: #34495e !important; }.btn-primary a:hover {  background-color: #34495e !important;  border-color: #34495e !important; } }</style>  </head>  <body class=""><table border="0" cellpadding="0" cellspacing="0" class="body">  <tr><td>&nbsp;</td><td class="container">  <div class="content"><!-- START CENTERED WHITE CONTAINER --><span class="preheader">This is preheader text. Some clients will show this text as a preview.</span><table class="main">  <!-- START MAIN CONTENT AREA -->  <tr><td class="wrapper">  <table border="0" cellpadding="0" cellspacing="0"><tr>  <td><p>Hola ' + nombre + ',</p><p>Usted solicito un turno para la jornada de castracion de ' + localidad + ' el dia ' + fecha + '.</p>                        <p>Se le otorgara un turno para las ' + hora + ' hs.</p>                       <p>Zona: ' + direparcial + ', (la direccion exacta se brindara 48hs antes por mail).</p>                       <p>Costo: $' + precio + '</p>                       <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">  <tbody><tr>  <td align="left"><table border="0" cellpadding="0" cellspacing="0">  <tbody><tr>  <td> <a href="http://localhost:8080/castraciones/confirmarTurno/' + idTurno+ ' " target="_blank">CONFIRMAR TURNO</a> </td></tr>  </tbody></table>  </td></tr>  </tbody></table><p>Muchas gracias.</p><p>Organizacion Love Animals.</p>  </td></tr>  </table></td>  </tr><!-- END MAIN CONTENT AREA --></table><!-- START FOOTER --><div class="footer">  <table border="0" cellpadding="0" cellspacing="0"><tr>  <td class="content-block"><span class="apple-link">Castraciones.com.ar</span><br> Si quiere cancelar el turno haga click <a href="http://i.imgur.com/CScmqnj.gif">AQUI</a>.  </td></tr><tr>  <td class="content-block powered-by">Powered by <a href="http://htmlemail.io">HTMLemail</a>.  </td></tr>  </table></div><!-- END FOOTER -->  <!-- END CENTERED WHITE CONTAINER -->  </div></td><td>&nbsp;</td>  </tr></table>  </body></html>'

    };

    transporter.sendMail(mailOptions, function(err, data){
        if (err){
            console.log(err);
            //res.send(500, err.message);
            
        } else {
            console.log("Email sent");
            
        }
    });

   
};



function actualizar_hora_jornada(idJornada, hora){
    var myquery = { 
                        _id:idJornada,
                  };
    
    var newvalues = {
                        $set: {
                                
                                hora_prox_turno: hora,
                              } 

                    };
    Jornadas.updateOne(myquery, newvalues, function(err, data) {
    if (err) throw err;
    console.log("Se actualizo hora de la jornada ");
   
    
    });
}

function actualizar_contador_jornada(idJornada, contador){
    console.log("actualizando contador " + contador)
    var myquery = { 
                        _id:idJornada,
                  };
    
    var newvalues = {
                        $set: {
                                cont: contador,
                              } 

                    };
    Jornadas.updateOne(myquery, newvalues, function(err, data) {
    if (err) throw err;
    console.log("Se actualizo el contador de la jornada " );
    
    
    });
}

function actualizar_hora_turno(idTurno, hora){
    console.log("actualizando hora de turno " + hora)
    var myquery = { 
                        _id:idTurno,
                  };
    
    var newvalues = {
                        $set: {
                                hora: hora,
                              } 

                    };
    Turno.updateOne(myquery, newvalues, function(err, data) {
    if (err) throw err;
    console.log("Se actualizo la hora del turno " + hora );
    
    
    });
}

function sumar_mediahora(hora){

    var hora_final = moment(hora).add(30, 'minutes').format('HH:mm');
    console.log("hora sumada " + hora_final);
    return hora_final;
}

exports.confirmar_turno = function (req, res) {
    var myquery = { 
                        _id:req.params.id,
                  };
    
    var newvalues = {
                        $set: {
                                confirmado: 1,
                              } 

                    };
    Turno.updateOne(myquery, newvalues, function(err, data) {
    if (err) throw err;

        res.render('turnos/confirmarTurno',  { 
                'jobs': data, 
                moment: moment 
        });
    });
    console.log("Se confirmo el turno" );
};