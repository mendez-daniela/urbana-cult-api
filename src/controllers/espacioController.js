const EspacioModel = require('../models/EspacioModel');

// Instanciamos el modelo (creamos un objeto a partir de la clase)
const espacioModel = new EspacioModel();

const obtenerEspacios = (req, res) => {
  try {
    const espacios = espacioModel.obtenerTodos();
    res.json(espacios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al leer los datos' });
  }
};

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

const crearEspacio = (req, res) => {
  try {
    const nuevoEspacio = espacioModel.crear(req.body);
    res.status(201).json(nuevoEspacio);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar los datos' });
  }
};

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