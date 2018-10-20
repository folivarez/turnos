const express = require('express');
const router = express.Router();

const turno_controller = require('../controllers/turno.controller');

router.get('/turno', turno_controller.turno);
router.get('/turnoLista', turno_controller.turnoLista);

router.post('/turno', turno_controller.turno_create);
router.get('/confirmarTurno/:id', turno_controller.confirmar_turno);
router.get('/cancelarTurno/:id', turno_controller.cancelar_turno);



module.exports = router;

/*
hay que 
obtener los datos de la jornada
guardar el turno
y enviar mail con horario precio y direccion (todo desde js) ? val1 : val2;*/