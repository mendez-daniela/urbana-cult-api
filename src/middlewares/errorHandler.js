// Nombres legibles de los campos para los mensajes de error
const NOMBRES_CAMPOS = {
  nombre: 'nombre',
  direccion: 'dirección',
  comuna: 'comuna',
  barrio: 'barrio',
  capacidad: 'capacidad',
  descripcion: 'descripción',
  telefono: 'teléfono'
};

// Traduce un CastError de Mongoose (tipo de dato incorrecto) a lenguaje natural
const mensajeCastError = (e) => {
  if (e.path === '_id') return 'ID inválido';

  const campo = NOMBRES_CAMPOS[e.path] || e.path;
  const tipos = {
    Number: 'un número',
    String: 'un texto',
    Date: 'una fecha válida',
    Boolean: 'verdadero o falso'
  };
  const esperado = tipos[e.kind] || 'un valor válido';
  return `El campo ${campo} debe ser ${esperado}`;
};

// Middleware global para el manejo de errores
const errorHandler = (err, req, res, next) => {
  console.error('Error capturado por el middleware:', err.message);

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const mensajes = Object.values(err.errors).map(e =>
      e.name === 'CastError' ? mensajeCastError(e) : e.message
    );
    return res.status(400).json({ mensaje: mensajes.join('. ') });
  }

  // Error de CastError (ObjectID inválido o tipo de dato incorrecto)
  if (err.name === 'CastError') {
    return res.status(400).json({ mensaje: mensajeCastError(err) });
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