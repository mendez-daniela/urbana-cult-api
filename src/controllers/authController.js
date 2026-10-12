const Usuario = require('../models/Usuario.js');

// ==========================================
// REGISTRO
// ==========================================

// Mostrar formulario de registro
const mostrarRegistro = (req, res) => {
  // Si ya está logueado, redirige a espacios
  if (req.session && req.session.usuarioId) {
    return res.redirect('/espacios');
  }
  res.render('registro', { error: null });
};

// Procesar registro
const registro = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.render('registro', {
        error: 'Email y contraseña son obligatorios'
      });
    }

    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.render('registro', {
        error: 'Ese email ya está registrado'
      });
    }

    // Crear el usuario (el hash se hace en el pre-save del modelo)
    const nuevoUsuario = new Usuario({ email, password });
    await nuevoUsuario.save();

    // Iniciar sesión automáticamente
    req.session.usuarioId = nuevoUsuario._id;
    req.session.usuarioEmail = nuevoUsuario.email;

    res.redirect('/espacios');
  } catch (error) {
    console.error('Error en registro:', error);
    res.render('registro', {
      error: 'Error al crear la cuenta: ' + error.message
    });
  }
};

// ==========================================
// LOGIN
// ==========================================

// Mostrar formulario de login
const mostrarLogin = (req, res) => {
  // Si ya está logueado, redirige a espacios
  if (req.session && req.session.usuarioId) {
    return res.redirect('/espacios');
  }
  res.render('login', { error: null });
};

// Procesar login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.render('login', {
        error: 'Email y contraseña son obligatorios'
      });
    }

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.render('login', {
        error: 'Email o contraseña incorrectos'
      });
    }

    // Comparar contraseña
    const passwordCorrecta = await usuario.compararPassword(password);
    if (!passwordCorrecta) {
      return res.render('login', {
        error: 'Email o contraseña incorrectos'
      });
    }

    // Iniciar sesión
    req.session.usuarioId = usuario._id;
    req.session.usuarioEmail = usuario.email;

    res.redirect('/espacios');
  } catch (error) {
    console.error('Error en login:', error);
    res.render('login', {
      error: 'Error al iniciar sesión: ' + error.message
    });
  }
};

// ==========================================
// LOGOUT
// ==========================================

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/login');
  });
};

module.exports = {
  mostrarRegistro,
  registro,
  mostrarLogin,
  login,
  logout
};