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

    if (!nombre || !nombre.trim() || !direccion || !barrio || !comuna || !capacidad) {
      throw new Error('Faltan campos obligatorios: nombre, direccion, barrio, comuna y capacidad son requeridos');
    }

    const comunaNum = parseInt(comuna);
    if (isNaN(comunaNum) || (comunaNum !== 3 && comunaNum !== 5)) {
      throw new Error('La comuna debe ser 3 (Balvanera/San Cristóbal) o 5 (Almagro/Boedo)');
    }

    if (isNaN(capacidad) || capacidad < 1) {
      throw new Error('La capacidad debe ser un número mayor a 0');
    }

    if (!/\d/.test(direccion)) {
      throw new Error('La dirección debe incluir un número');
    }

    if (telefono && !/^[0-9+\-\s]+$/.test(telefono)) {
      throw new Error('El teléfono solo puede contener números, guiones, espacios y el signo +');
    }

    const espacios = this._leerArchivo();
    if (espacios.some(e => e.nombre.toLowerCase() === nombre.toLowerCase())) {
      throw new Error('Ya existe un espacio con ese nombre');
    }

    const nuevoId = espacios.length > 0 ? Math.max(...espacios.map(e => e.id)) + 1 : 1;
    const espacioConId = {
      id: nuevoId,
      nombre,
      direccion,
      barrio,
      comuna: comunaNum,
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

    if (datosLimpios.nombre !== undefined && !datosLimpios.nombre.trim()) {
      throw new Error('El nombre no puede estar vacío');
    }

    if (datosLimpios.nombre !== undefined) {
      const nombreDuplicado = espacios.some(e =>
        e.id !== id && e.nombre.toLowerCase() === datosLimpios.nombre.toLowerCase()
      );
      if (nombreDuplicado) {
        throw new Error('Ya existe un espacio con ese nombre');
      }
    }

    if (datosLimpios.comuna !== undefined) {
      const comunaNum = parseInt(datosLimpios.comuna);
      if (isNaN(comunaNum) || (comunaNum !== 3 && comunaNum !== 5)) {
        throw new Error('La comuna debe ser 3 (Balvanera/San Cristóbal) o 5 (Almagro/Boedo)');
      }
      datosLimpios.comuna = comunaNum;
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

    if (datosLimpios.telefono !== undefined && datosLimpios.telefono && !/^[0-9+\-\s]+$/.test(datosLimpios.telefono)) {
      throw new Error('El teléfono solo puede contener números, guiones, espacios y el signo +');
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