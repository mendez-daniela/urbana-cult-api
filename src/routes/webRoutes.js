const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController.js');

router.get('/espacios', webController.listarEspacios);
router.get('/espacios/nuevo', webController.mostrarFormularioNuevo);
router.post('/espacios/crear', webController.crearEspacio);
router.get('/espacios/editar/:id', webController.mostrarFormularioEditar);
router.post('/espacios/actualizar/:id', webController.actualizarEspacio);
router.get('/espacios/eliminar/:id', webController.eliminarEspacio);
router.get('/espacios/detalle/:id', webController.verDetalleEspacio);

module.exports = router;