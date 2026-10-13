const mongoose = require('mongoose');
const BARRIOS_POR_COMUNA = require('../config/barrios.js');

const espacioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
    trim: true
  },
  direccion: {
    type: String,
    required: [true, 'La dirección es obligatoria'],
    validate: {
      validator: (v) => /\d/.test(v),
      message: 'La dirección debe incluir un número'
    }
  },
  comuna: {
    type: Number,
    required: [true, 'La comuna es obligatoria'],
    enum: {
      values: [3, 5],
      message: 'La comuna debe ser 3 (Balvanera/San Cristóbal) o 5 (Almagro/Boedo)'
    }
  },
  barrio: {
    type: String,
    required: [true, 'El barrio es obligatorio'],
    trim: true,
    validate: {
      validator: function (v) {
        // Detectar si es un update (query) o un save (documento)
        const esQuery = this.getUpdate !== undefined;
        const comuna = esQuery
          ? (this.getUpdate()?.comuna || this.getUpdate()?.$set?.comuna)
          : this.comuna;

        if (!comuna || !BARRIOS_POR_COMUNA[comuna]) return true;

        const normalizar = (str) => str
          .trim()
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        return BARRIOS_POR_COMUNA[comuna]
          .map(normalizar)
          .includes(normalizar(v));
      },
      message: 'El barrio no corresponde a la comuna seleccionada.'
    }
  },
  capacidad: {
    type: Number,
    required: [true, 'La capacidad es obligatoria'],
    min: [1, 'La capacidad debe ser mayor a 0'],
    max: [1000, 'La capacidad debe ser menor a 1000']
  },
  descripcion: {
    type: String,
    default: ''
  },
  telefono: {
    type: String,
    validate: {
      validator: (v) => !v || /^[\d\s\-+]+$/.test(v),
      message: 'El teléfono solo puede contener números, guiones, espacios y +'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Espacio', espacioSchema);