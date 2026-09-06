const fs = require('fs');
const path = require('path');

class EspacioModel {
  constructor() {
    this.filePath = path.join(__dirname, '../../data/espacios.json');
  }

  // Método privado para leer
  _leerArchivo() {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  // Método privado para guardar
  _guardarArchivo(espacios) {
    fs.writeFileSync(this.filePath, JSON.stringify(espacios, null, 2));
  }

  // Obtener todos
  obtenerTodos() {
    return this._leerArchivo();
  }

  // Obtener por ID
  obtenerPorId(id) {
    const espacios = this._leerArchivo();
    return espacios.find(e => e.id === id) || null;
  }

  // Crear
  crear(nuevoEspacio) {
    const { nombre, direccion, barrio, comuna, capacidad, descripcion, telefono } = nuevoEspacio;

    if (!nombre || !direccion || !barrio || !comuna || !capacidad) {
      throw new Error('Faltan campos obligatorios: nombre, direccion, barrio, comuna y capacidad son requeridos');
    }

    if (isNaN(comuna) || comuna < 1 || comuna > 15) {
      throw new Error('La comuna debe ser un número entre 1 y 15');
    }

    if (isNaN(capacidad) || capacidad < 1) {
      throw new Error('La capacidad debe ser un número mayor a 0');
    }

    if (!/\d/.test(direccion)) {
      throw new Error('La dirección debe incluir un número');
    }

    const espacios = this._leerArchivo();
    const nuevoId = espacios.length > 0 ? Math.max(...espacios.map(e => e.id)) + 1 : 1;
    const espacioConId = {
      id: nuevoId,
      nombre,
      direccion,
      barrio,
      comuna: parseInt(comuna),
      capacidad: parseInt(capacidad),
      descripcion: descripcion || '',
      telefono: telefono || ''
    };
    espacios.push(espacioConId);
    this._guardarArchivo(espacios);
    return espacioConId;
  }

  // Actualizar
  actualizar(id, datosActualizados) {
    const espacios = this._leerArchivo();
    const index = espacios.findIndex(e => e.id === id);
    if (index === -1) return null;

    const { id: _, ...datosLimpios } = datosActualizados;

    if (datosLimpios.comuna !== undefined) {
      const comuna = datosLimpios.comuna;
      if (isNaN(comuna) || comuna < 1 || comuna > 15) {
        throw new Error('La comuna debe ser un número entre 1 y 15');
      }
      datosLimpios.comuna = parseInt(comuna);
    }

    if (datosLimpios.capacidad !== undefined) {
      const capacidad = datosLimpios.capacidad;
      if (isNaN(capacidad) || capacidad < 1) {
        throw new Error('La capacidad debe ser un número mayor a 0');
      }
      datosLimpios.capacidad = parseInt(capacidad);
    }

    if (datosLimpios.direccion !== undefined) {
      const direccion = datosLimpios.direccion;
      if (!/\d/.test(direccion)) {
        throw new Error('La dirección debe incluir un número');
      }
    }

    espacios[index] = { ...espacios[index], ...datosLimpios };
    this._guardarArchivo(espacios);
    return espacios[index];
  }

  // Eliminar
  eliminar(id) {
    const espacios = this._leerArchivo();
    const nuevaLista = espacios.filter(e => e.id !== id);
    if (nuevaLista.length === espacios.length) return false;
    this._guardarArchivo(nuevaLista);
    return true;
  }
}

module.exports = EspacioModel;