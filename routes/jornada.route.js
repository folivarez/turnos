const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const jornada_controller = require('../controllers/jornada.controller');


router.get('/', jornada_controller.jornadas);
router.get('/jornadas', jornada_controller.lista);
router.get('/jornadas/:id', jornada_controller.jornada_details);
router.get('/jornadahora/:id', jornada_controller.jornada_hora);

router.post('/jornadas/update', jornada_controller.jornada_update_turno);
router.post('/jornadas', jornada_controller.jornada_create);

router.delete('/jornadas/:id/delete', jornada_controller.jornada_delete);


module.exports = router;