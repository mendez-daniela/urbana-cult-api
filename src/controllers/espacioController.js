const EspacioModel = require('../models/EspacioModel');

// Instanciamos y validamos
const espacioModel = new EspacioModel();

// Obtener todos
const obtenerEspacios = (req, res) => {
  try {
    const espacios = espacioModel.obtenerTodos();
    res.json(espacios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al leer los datos' });
  }
};

// Obtener por ID
const obtenerEspacioPorId = (req, res) => {
  try {
    const espacio = espacioModel.obtenerPorId(parseInt(req.params.id));
    if (!espacio) {
      return res.status(404).json({ mensaje: 'Espacio no encontrado' });
    }
    res.json(espacio);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al leer los datos' });
  }
};

// Crear
const crearEspacio = (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        mensaje: 'El cuerpo de la solicitud no puede estar vacío' 
      });
    }
    const nuevoEspacio = espacioModel.crear(req.body);
    res.status(201).json(nuevoEspacio);
  } catch (error) {
    if (error.message.includes('Faltan campos obligatorios') || 
        error.message.includes('comuna') || 
        error.message.includes('capacidad') || 
        error.message.includes('dirección') ||
        error.message.includes('direccion')) {
      return res.status(400).json({ mensaje: error.message });
    }
    res.status(500).json({ mensaje: 'Error al guardar los datos' });
  }
};

// Actualizar
const actualizarEspacio = (req, res) => {
  try {
    const espacioActualizado = espacioModel.actualizar(parseInt(req.params.id), req.body);
    if (!espacioActualizado) {
      return res.status(404).json({ mensaje: 'Espacio no encontrado' });
    }
    res.json(espacioActualizado);
  } catch (error) {
    if (error.message.includes('comuna') || 
        error.message.includes('capacidad') || 
        error.message.includes('dirección') ||
        error.message.includes('direccion')) {
      return res.status(400).json({ mensaje: error.message });
    }
    res.status(500).json({ mensaje: 'Error al actualizar los datos' });
  }
};

// Eliminar
const eliminarEspacio = (req, res) => {
  try {
    const eliminado = espacioModel.eliminar(parseInt(req.params.id));
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Espacio no encontrado' });
    }
    res.json({ mensaje: 'Espacio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar los datos' });
  }
};

module.exports = {
  obtenerEspacios,
  obtenerEspacioPorId,
  crearEspacio,
  actualizarEspacio,
  eliminarEspacio
};