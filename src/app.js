require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo').default || require('connect-mongo');
const cors = require('cors'); 
const compression = require('compression'); 
const conectarDB = require('./config/db');
const espacioRoutes = require('./routes/espacioRoutes.js');
const webRoutes = require('./routes/webRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const logger = require('./middlewares/logger.js');
const autenticado = require('./middlewares/autenticado.js');
const errorHandler = require('./middlewares/errorHandler.js');

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
app.use(cors()); 
app.use(compression()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Configurar sesión para producción (Vercel usa HTTPS)
app.use(session({
  secret: process.env.SESSION_SECRET || 'urbana-cult-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI,
    dbName: 'urbana-cult', // Forzamos el nombre de la base
    ttl: 24 * 60 * 60 
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
}));

// Pasar datos del usuario a las vistas
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuarioEmail || null;
  next();
});

// Rutas
app.use('/', authRoutes);
app.use('/api/espacios', espacioRoutes);
app.use('/espacios', autenticado, webRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  if (req.session && req.session.usuarioId) {
    return res.redirect('/espacios');
  }
  res.redirect('/login');
});

// Middleware de manejo de errores (siempre al final)
app.use(errorHandler);

// --- ADAPTACIÓN PARA VERCEL ---
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
}

// Exportamos la app para que Vercel la use como Serverless Function
module.exports = app; 