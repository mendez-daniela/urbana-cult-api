const express = require('express');
const espacioRoutes = require('./routes/espacioRoutes.js');
const logger = require('./middlewares/logger.js');
const EspacioModel = require('./models/EspacioModel.js');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;
const espacioModel = new EspacioModel();

// Configurar Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (imágenes, CSS, etc.)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para leer datos de formularios
app.use(logger);

// Usar las rutas de la API
app.use('/api/espacios', espacioRoutes);

// ==========================================
// RUTAS DE LA INTERFAZ WEB (PUG)
// ==========================================

// 1. Listar todos los espacios
app.get('/espacios', (req, res) => {
  try {
    const espacios = espacioModel.obtenerTodos();
    res.render('espacios', { espacios });
  } catch (error) {
    console.error('Error al cargar los espacios:', error);
    res.status(500).send('Error al cargar los espacios: ' + error.message);
  }
});

// 2. Mostrar formulario de nuevo espacio
app.get('/espacios/nuevo', (req, res) => {
  res.render('nuevoEspacio');
});

// 3. Crear un nuevo espacio desde el formulario
app.post('/espacios/crear', (req, res) => {
  try {
    espacioModel.crear(req.body);
    res.redirect('/espacios');
  } catch (error) {
    console.error('Error al crear el espacio:', error);
    res.status(400).send('Error al crear el espacio: ' + error.message);
  }
});

// 4. Mostrar formulario de edición
app.get('/espacios/editar/:id', (req, res) => {
  try {
    const espacio = espacioModel.obtenerPorId(parseInt(req.params.id));
    if (!espacio) {
      return res.status(404).send('Espacio no encontrado');
    }
    res.render('editarEspacio', { espacio });
  } catch (error) {
    console.error('Error al cargar el espacio:', error);
    res.status(500).send('Error al cargar el espacio: ' + error.message);
  }
});

// 5. Actualizar un espacio desde el formulario
app.post('/espacios/actualizar/:id', (req, res) => {
  try {
    espacioModel.actualizar(parseInt(req.params.id), req.body);
    res.redirect('/espacios');
  } catch (error) {
    console.error('Error al actualizar el espacio:', error);
    res.status(400).send('Error al actualizar el espacio: ' + error.message);
  }
});

// 6. Eliminar un espacio desde la interfaz
app.get('/espacios/eliminar/:id', (req, res) => {
  try {
    espacioModel.eliminar(parseInt(req.params.id));
    res.redirect('/espacios');
  } catch (error) {
    console.error('Error al eliminar el espacio:', error);
    res.status(500).send('Error al eliminar el espacio: ' + error.message);
  }
});

// 7. Ver detalle de un espacio (opcional)
app.get('/espacios/detalle/:id', (req, res) => {
  try {
    const espacio = espacioModel.obtenerPorId(parseInt(req.params.id));
    if (!espacio) {
      return res.status(404).send('Espacio no encontrado');
    }
    res.render('detalleEspacio', { espacio });
  } catch (error) {
    console.error('Error al cargar el espacio:', error);
    res.status(500).send('Error al cargar el espacio: ' + error.message);
  }
});

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡API de Urbana Cult funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});