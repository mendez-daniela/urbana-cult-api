const express = require('express');
const {
  obtenerPersonas,
  obtenerPersonaPorId,
  crearPersona,
  actualizarPersona,
  eliminarPersona
} = require('../controllers/espacioController.js');

const router = express.Router();

router.get('/', obtenerPersonas);
router.get('/:id', obtenerPersonaPorId);
router.post('/', crearPersona);
router.put('/:id', actualizarPersona);
router.delete('/:id', eliminarPersona);

module.exports = router;