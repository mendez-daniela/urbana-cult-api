const Espacio = require('../models/Espacio.js');

// 1. Listar todos los espacios
const listarEspacios = async (req, res) => {
  try {
    const espacios = await Espacio.find();
    res.render('espacios', { espacios });
  } catch (error) {
    console.error('Error al cargar los espacios:', error);
    res.status(500).send('Error al cargar los espacios: ' + error.message);
  }
};

// 2. Mostrar formulario de nuevo espacio
const mostrarFormularioNuevo = (req, res) => {
  res.render('nuevoEspacio');
};

// 3. Crear un nuevo espacio
const crearEspacio = async (req, res) => {
  try {
    const nuevoEspacio = new Espacio(req.body);
    await nuevoEspacio.save();
    res.redirect('/espacios');
  } catch (error) {
    console.error('Error al crear el espacio:', error);
    res.status(400).send('Error al crear el espacio: ' + error.message);
  }
};

// 4. Mostrar formulario de edición
const mostrarFormularioEditar = async (req, res) => {
  try {
    const espacio = await Espacio.findById(req.params.id);
    if (!espacio) {
      return res.status(404).send('Espacio no encontrado');
    }
    res.render('editarEspacio', { espacio });
  } catch (error) {
    console.error('Error al cargar el espacio:', error);
    res.status(500).send('Error al cargar el espacio: ' + error.message);
  }
};

// 5. Actualizar un espacio
const actualizarEspacio = async (req, res) => {
  try {
    const datos = { ...req.body };
    delete datos._id;
    await Espacio.findByIdAndUpdate(req.params.id, datos, {
      new: true,
      runValidators: true
    });
    res.redirect('/espacios');
  } catch (error) {
    console.error('Error al actualizar el espacio:', error);
    res.status(400).send('Error al actualizar el espacio: ' + error.message);
  }
};

// 6. Eliminar un espacio
const eliminarEspacio = async (req, res) => {
  try {
    await Espacio.findByIdAndDelete(req.params.id);
    res.redirect('/espacios');
  } catch (error) {
    console.error('Error al eliminar el espacio:', error);
    res.status(500).send('Error al eliminar el espacio: ' + error.message);
  }
};

// 7. Ver detalle de un espacio
const verDetalleEspacio = async (req, res) => {
  try {
    const espacio = await Espacio.findById(req.params.id);
    if (!espacio) {
      return res.status(404).send('Espacio no encontrado');
    }
    res.render('detalleEspacio', { espacio });
  } catch (error) {
    console.error('Error al cargar el espacio:', error);
    res.status(500).send('Error al cargar el espacio: ' + error.message);
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