const express = require('express');
const {
  obtenerEspacios,
  obtenerEspacioPorId,
  crearEspacio,
  actualizarEspacio,
  eliminarEspacio
} = require('../controllers/espacioController.js');

const router = express.Router();

router.get('/', obtenerEspacios);
router.get('/:id', obtenerEspacioPorId);
router.post('/', crearEspacio);
router.put('/:id', actualizarEspacio);
router.delete('/:id', eliminarEspacio);

module.exports = router;