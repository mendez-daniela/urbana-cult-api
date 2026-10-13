const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController.js');

router.get('/', webController.listarEspacios);
router.get('/nuevo', webController.mostrarFormularioNuevo);
router.post('/crear', webController.crearEspacio);
router.get('/editar/:id', webController.mostrarFormularioEditar);
router.post('/actualizar/:id', webController.actualizarEspacio);
router.get('/eliminar/:id', webController.eliminarEspacio);
router.get('/detalle/:id', webController.verDetalleEspacio);

module.exports = router;