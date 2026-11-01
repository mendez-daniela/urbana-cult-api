// Middleware global para el manejo de errores
const errorHandler = (err, req, res, next) => {
  console.error('Error capturado por el middleware:', err.message);

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const mensajes = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ mensaje: mensajes.join('. ') });
  }

  // Error de CastError (ObjectID inválido)
  if (err.name === 'CastError') {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }

  // Error de duplicado
  if (err.code === 11000) {
    return res.status(400).json({ mensaje: 'Ya existe un registro con esos datos' });
  }

  // Error genérico: ocultar detalles técnicos en producción
  const mensajeError = process.env.NODE_ENV === 'production' 
    ? 'Error interno del servidor' 
    : err.message;

  res.status(500).json({ mensaje: mensajeError });
};

module.exports = errorHandler;