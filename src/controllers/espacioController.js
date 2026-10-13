const Espacio = require('../models/Espacio.js');

// Obtener todos
const obtenerEspacios = async (req, res) => {
  try {
    const espacios = await Espacio.find();
    res.status(200).json(espacios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener espacios', error: error.message });
  }
};

// Obtener por ID
const obtenerEspacioPorId = async (req, res) => {
  try {
    const espacio = await Espacio.findById(req.params.id);
    if (!espacio) {
      return res.status(404).json({ mensaje: 'Espacio no encontrado' });
    }
    res.status(200).json(espacio);
  } catch (error) {
    res.status(400).json({ mensaje: 'ID inválido', error: error.message });
  }
};

// Crear
const crearEspacio = async (req, res) => {
  try {
    const nuevoEspacio = new Espacio(req.body);
    const guardado = await nuevoEspacio.save();
    res.status(201).json(guardado);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: 'Ya existe un espacio con ese nombre' });
    }
    if (error.name === 'ValidationError') {
      const mensajes = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ mensaje: mensajes.join('. ') });
    }
    res.status(400).json({ mensaje: 'Error al crear el espacio', error: error.message });
  }
};

// Actualizar
const actualizarEspacio = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = { ...req.body };
    delete datos._id;

    const actualizado = await Espacio.findByIdAndUpdate(id, datos, {
      new: true,
      runValidators: true
    });

    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Espacio no encontrado' });
    }
    res.status(200).json(actualizado);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: 'Ya existe un espacio con ese nombre' });
    }
    if (error.name === 'ValidationError') {
      const mensajes = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ mensaje: mensajes.join('. ') });
    }
    res.status(400).json({ mensaje: 'Error al actualizar el espacio', error: error.message });
  }
};

// Eliminar
const eliminarEspacio = async (req, res) => {
  try {
    const eliminado = await Espacio.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Espacio no encontrado' });
    }
    res.status(200).json({ mensaje: 'Espacio eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'ID inválido', error: error.message });
  }
};

module.exports = {
  obtenerEspacios,
  obtenerEspacioPorId,
  crearEspacio,
  actualizarEspacio,
  eliminarEspacio
};