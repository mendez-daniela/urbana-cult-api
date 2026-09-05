const EspacioModel = require('../models/EspacioModel');

// Instanciamos el modelo
const espacioModel = new EspacioModel();

// Obtener todos los espacios
const obtenerEspacios = (req, res) => {
  try {
    const espacios = espacioModel.obtenerTodos();
    res.json(espacios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al leer los datos' });
  }
};

// Obtener un espacio por ID
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

// Crear un nuevo espacio
const crearEspacio = (req, res) => {
  try {
    const nuevoEspacio = espacioModel.crear(req.body);
    res.status(201).json(nuevoEspacio);
  } catch (error) {
    // Si el error es de validación, responder con 400 Bad Request
    if (error.message.includes('Faltan campos obligatorios') || 
        error.message.includes('comuna') || 
        error.message.includes('capacidad')) {
      return res.status(400).json({ mensaje: error.message });
    }
    res.status(500).json({ mensaje: 'Error al guardar los datos' });
  }
};

// Actualizar un espacio existente
const actualizarEspacio = (req, res) => {
  try {
    const espacioActualizado = espacioModel.actualizar(parseInt(req.params.id), req.body);
    if (!espacioActualizado) {
      return res.status(404).json({ mensaje: 'Espacio no encontrado' });
    }
    res.json(espacioActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar los datos' });
  }
};

// Eliminar un espacio
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