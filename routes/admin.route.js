const express = require('express');
var passport = require("passport");
const router = express.Router();

const admin_controller = require('../controllers/admin.controller');
const public_controller = require('../controllers/public.controller');
const veterinario_controller = require('../controllers/veterinario.controller');
const auth_controller = require('../controllers/auth.controller');

//router.post('/login', auth_controller.doLogin);

router.get('/dashboard', isLoggedIn,admin_controller.admin);
router.get('/cartel_web', isLoggedIn, admin_controller.cartel_web);
router.post('/newAviso', isLoggedIn, public_controller.new_aviso);

router.post('/testturno',  isLoggedIn, admin_controller.test_turno);

router.get('/cantidaddeturnos', isLoggedIn, admin_controller.cantidadDeTurnosView);
router.post('/cantidaddeturnos', isLoggedIn, admin_controller.cantidadDeTurnos);

router.post('/updateAviso',  isLoggedIn, public_controller.update_aviso);
router.get('/getAviso/:id',   public_controller.get_aviso);

router.get('/altaJornada',  isLoggedIn, veterinario_controller.listaCombo);
router.get('/veterinarios',  isLoggedIn, veterinario_controller.lista);
router.post('/veterinarios',  isLoggedIn, veterinario_controller.new_veterinario);
router.post('/veterinariosNombre',   veterinario_controller.veterinario_por_nombre);
router.post('/veterinarios/delete',  isLoggedIn, veterinario_controller.veterinario_delete);


//route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    /*res.status(400).json({
        'message': 'Dashboard access denied'
    });*/
    req.session.returnTo =  req.originalUrl; 
    res.redirect('/castraciones/home');
}

module.exports = router;