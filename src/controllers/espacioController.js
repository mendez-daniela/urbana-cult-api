const Espacio = require('../models/Espacio.js');

// Obtener todos
const obtenerEspacios = async (req, res, next) => {
  try {
    const espacios = await Espacio.find();
    res.status(200).json(espacios);
  } catch (error) {
    next(error);
  }
};

// Obtener por ID
const obtenerEspacioPorId = async (req, res, next) => {
  try {
    const espacio = await Espacio.findById(req.params.id);
    if (!espacio) {
      return res.status(404).json({ mensaje: 'Espacio no encontrado' });
    }
    res.status(200).json(espacio);
  } catch (error) {
    next(error);
  }
};

// Crear
const crearEspacio = async (req, res, next) => {
  try {
    const nuevoEspacio = new Espacio(req.body);
    const guardado = await nuevoEspacio.save();
    res.status(201).json(guardado);
  } catch (error) {
    next(error);
  }
};

// Actualizar
const actualizarEspacio = async (req, res, next) => {
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
    next(error);
  }
};

// Eliminar
const eliminarEspacio = async (req, res, next) => {
  try {
    const eliminado = await Espacio.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Espacio no encontrado' });
    }
    res.status(200).json({ mensaje: 'Espacio eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerEspacios,
  obtenerEspacioPorId,
  crearEspacio,
  actualizarEspacio,
  eliminarEspacio
};