const express = require('express');
const spazioRoutes = require('./routes/espacioRoutes.js');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 4000;

// Configurar Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

// Usar las rutas de la API
app.use('/api/espacios', spazioRoutes);

// Ruta para mostrar los espacios en el navegador
app.get('/espacios', (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/espacios.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const espacios = JSON.parse(data);
    res.render('espacios', { espacios });
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    res.status(500).send('Error al cargar los espacios: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:4000`);
});