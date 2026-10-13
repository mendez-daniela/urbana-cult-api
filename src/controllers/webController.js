const Espacio = require('../models/Espacio.js');
const BARRIOS_POR_COMUNA = require('../config/barrios.js');

// Función auxiliar: devuelve la comuna a la que pertenece un barrio
const obtenerComuna = (barrio) => {
  return Object.keys(BARRIOS_POR_COMUNA).find(comuna => BARRIOS_POR_COMUNA[comuna].includes(barrio));
};

// Función auxiliar: arma los datos del formulario con la comuna deducida del barrio
const armarDatos = (body) => {
  const datos = { ...body, comuna: obtenerComuna(body.barrio) };
  delete datos._id;
  return datos;
};

// Función auxiliar: arma el mensaje a mostrar a partir de un error de Mongoose
const armarMensajeError = (error, mensajePorDefecto) => {
  if (error.name === 'ValidationError') {
    return Object.values(error.errors).map(e => e.message).join('. ');
  }
  if (error.code === 11000) {
    return 'Ya existe un espacio con ese nombre';
  }
  return mensajePorDefecto;
};

// Listar todos los espacios
const listarEspacios = async (req, res) => {
  try {
    const espacios = await Espacio.find();
    res.render('espacios', { espacios });
  } catch (error) {
    console.error('Error al cargar los espacios:', error);
    res.status(500).send('Error al cargar los espacios');
  }
};

// Mostrar formulario de nuevo espacio
const mostrarFormularioNuevo = (req, res) => {
  res.render('nuevoEspacio', { error: null, datos: {}, barriosPorComuna: BARRIOS_POR_COMUNA });
};

// Crear un nuevo espacio
const crearEspacio = async (req, res) => {
  const datos = armarDatos(req.body);
  try {
    const nuevoEspacio = new Espacio(datos);
    await nuevoEspacio.save();
    res.redirect('/espacios');
  } catch (error) {
    console.error('Error al crear el espacio:', error);
    const mensaje = armarMensajeError(error, 'Error al crear el espacio');
    res.render('nuevoEspacio', { error: mensaje, datos, barriosPorComuna: BARRIOS_POR_COMUNA });
  }
};

// Mostrar formulario de edición
const mostrarFormularioEditar = async (req, res) => {
  try {
    const espacio = await Espacio.findById(req.params.id);
    if (!espacio) {
      return res.status(404).send('Espacio no encontrado');
    }
    res.render('editarEspacio', { espacio, error: null, barriosPorComuna: BARRIOS_POR_COMUNA });
  } catch (error) {
    console.error('Error al cargar el espacio:', error);
    res.status(500).send('Error al cargar el espacio');
  }
};

// Actualizar un espacio
const actualizarEspacio = async (req, res) => {
  const datos = armarDatos(req.body);
  try {
    await Espacio.findByIdAndUpdate(req.params.id, datos, {
      new: true,
      runValidators: true
    });
    res.redirect('/espacios');
  } catch (error) {
    console.error('Error al actualizar el espacio:', error);
    const mensaje = armarMensajeError(error, 'Error al actualizar el espacio');
    res.render('editarEspacio', {
      error: mensaje,
      espacio: { ...datos, _id: req.params.id },
      barriosPorComuna: BARRIOS_POR_COMUNA
    });
  }
};

// Eliminar un espacio
const eliminarEspacio = async (req, res) => {
  try {
    await Espacio.findByIdAndDelete(req.params.id);
    res.redirect('/espacios');
  } catch (error) {
    console.error('Error al eliminar el espacio:', error);
    res.status(500).send('Error al eliminar el espacio');
  }
};

// Ver detalle de un espacio
const verDetalleEspacio = async (req, res) => {
  try {
    const espacio = await Espacio.findById(req.params.id);
    if (!espacio) {
      return res.status(404).send('Espacio no encontrado');
    }
    res.render('detalleEspacio', { espacio });
  } catch (error) {
    console.error('Error al cargar el espacio:', error);
    res.status(500).send('Error al cargar el espacio');
  }
};

module.exports = {
  listarEspacios,
  mostrarFormularioNuevo,
  crearEspacio,
  mostrarFormularioEditar,
  actualizarEspacio,
  eliminarEspacio,
  verDetalleEspacio
};