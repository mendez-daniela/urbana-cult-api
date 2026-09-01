const fs = require('fs');
const path = require('path');

class EspacioModel {
  constructor() {
    // Definimos la ruta al archivo JSON (subimos un nivel desde src/models)
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

  // Crear un nuevo espacio
  crear(nuevoEspacio) {
    const espacios = this._leerArchivo();
    const nuevoId = espacios.length > 0 ? Math.max(...espacios.map(e => e.id)) + 1 : 1;
    const espacioConId = { id: nuevoId, ...nuevoEspacio };
    espacios.push(espacioConId);
    this._guardarArchivo(espacios);
    return espacioConId;
  }

  // Actualizar un espacio existente
  actualizar(id, datosActualizados) {
    const espacios = this._leerArchivo();
    const index = espacios.findIndex(e => e.id === id);
    if (index === -1) return null;
    espacios[index] = { ...espacios[index], ...datosActualizados };
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

// Exportamos la clase para usarla en otros archivos
module.exports = EspacioModel;