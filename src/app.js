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

// Middlewares
app.use(express.json());
app.use(logger);

// Usar las rutas de la API
app.use('/api/espacios', espacioRoutes);

// Ruta para mostrar los espacios en el navegador
app.get('/espacios', (req, res) => {
  try {
    const espacios = espacioModel.obtenerTodos();
    res.render('espacios', { espacios });
  } catch (error) {
    console.error('Error al cargar los espacios:', error);
    res.status(500).send('Error al cargar los espacios: ' + error.message);
  }
});

app.get('/', (req, res) => {
  res.send('¡API de Urbana Cult funcionando! 🚀');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});