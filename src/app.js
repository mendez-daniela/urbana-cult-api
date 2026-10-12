require('dotenv').config();
const express = require('express');
const path = require('path');
const conectarDB = require('./config/db');
const espacioRoutes = require('./routes/espacioRoutes.js');
const webRoutes = require('./routes/webRoutes.js');
const logger = require('./middlewares/logger.js');

const app = express();
const port = process.env.PORT || 4000;

// Conectar MongoDB
conectarDB();

// Configurar Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Rutas
app.use('/api/espacios', espacioRoutes);
app.use('/', webRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡API de Urbana Cult funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});