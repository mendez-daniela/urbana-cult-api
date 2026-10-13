// Middleware que verifica si el usuario está logueado.
// Si lo está, deja pasar la petición (next()).
// Si no lo está, redirige a /login.

const autenticado = (req, res, next) => {
  if (req.session && req.session.usuarioId) {
    return next();
  }
  res.redirect('/login');
};

module.exports = autenticado;