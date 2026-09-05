const fs = require('fs');
const path = require('path');

class EspacioModel {
  constructor() {
    this.filePath = path.join(__dirname, '../../data/espacios.json');
  }

  // Método privado para leer el archivo JSON
  _leerArchivo() {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  // Método privado para guardar en el archivo JSON
  _guardarArchivo(espacios) {
    fs.writeFileSync(this.filePath, JSON.stringify(espacios, null, 2));
  }

  // Obtener todos los espacios
  obtenerTodos() {
    return this._leerArchivo();
  }

  // Obtener un espacio por ID
  obtenerPorId(id) {
    const espacios = this._leerArchivo();
    return espacios.find(e => e.id === id) || null;
  }

  // Crear un nuevo espacio (con validaciones)
  crear(nuevoEspacio) {
    const { nombre, direccion, barrio, comuna, capacidad, descripcion, telefono } = nuevoEspacio;

    // Validaciones
    if (!nombre || !direccion || !barrio || !comuna || !capacidad) {
      throw new Error('Faltan campos obligatorios: nombre, direccion, barrio, comuna y capacidad son requeridos');
    }

    if (isNaN(comuna) || comuna < 1 || comuna > 15) {
      throw new Error('La comuna debe ser un número entre 1 y 15');
    }

    if (isNaN(capacidad) || capacidad < 1) {
      throw new Error('La capacidad debe ser un número mayor a 0');
    }

    // Si pasa las validaciones, crear el espacio
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

  // Actualizar un espacio existente (sin permitir cambiar el ID)
  actualizar(id, datosActualizados) {
    const espacios = this._leerArchivo();
    const index = espacios.findIndex(e => e.id === id);
    if (index === -1) return null;

    // Eliminar el campo 'id' del body si viene, para evitar sobrescribirlo
    const { id: _, ...datosLimpios } = datosActualizados;

    espacios[index] = { ...espacios[index], ...datosLimpios };
    this._guardarArchivo(espacios);
    return espacios[index];
  }

  // Eliminar un espacio
  eliminar(id) {
    const espacios = this._leerArchivo();
    const nuevaLista = espacios.filter(e => e.id !== id);
    if (nuevaLista.length === espacios.length) return false;
    this._guardarArchivo(nuevaLista);
    return true;
  }
}

module.exports = EspacioModel;