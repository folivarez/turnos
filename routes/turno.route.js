const express = require('express');
const router = express.Router();

const turno_controller = require('../controllers/turno.controller');

router.get('/turno', turno_controller.turno);
router.get('/turnoLista', turno_controller.turnoLista);

router.post('/turno', turno_controller.turno_create);
router.get('/confirmarTurno/:id', turno_controller.confirmarTurno);

router.post('/cancelarTurno', turno_controller.cancelar_turno);

router.post('/btnConfirmarTurno', turno_controller.btnConfirmarTurno);

router.post('/envioAviso', turno_controller.envio_turno);


router.post('/presente', turno_controller.presente);
router.post('/turnoPorTelefono',   turno_controller.turnoPorTelefono);



module.exports = router;

