const express = require('express');
var passport = require("passport");
var back = require('express-back');
const router = express.Router();
const jornada_controller = require('../controllers/jornada.controller');

router.get('/', jornada_controller.jornadas);
router.get('/proximaJornada', jornada_controller.jornadasFecha);
router.get('/jornadasAll', isLoggedIn, jornada_controller.listaCompleta);
router.get('/jornadas', isLoggedIn, jornada_controller.jornada_details);
//router.get('/jornadas/:id', jornada_controller.jornada_details);
router.get('/jornadahora/:id', isLoggedIn, jornada_controller.jornada_hora);

router.post('/jornadas/updateAll', isLoggedIn, jornada_controller.jornada_update_all);
router.get('/jornadaId', isLoggedIn, jornada_controller.jornada_id);

router.post('/jornadas/update',isLoggedIn, jornada_controller.jornada_update_estado);
router.post('/jornadas/completa',isLoggedIn, jornada_controller.jornada_update_completa);
router.post('/jornadas',isLoggedIn, jornada_controller.jornada_create);

router.delete('/jornadas/:id/delete',isLoggedIn, jornada_controller.jornada_delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    /*res.status(400).json({
        'message': 'Dashboard access denied'
    });*/
    console.log('Request URL:', req.originalUrl);
    
   	req.session.returnTo =  req.originalUrl;    
    res.redirect('/castraciones/home');
    

}


module.exports = router;