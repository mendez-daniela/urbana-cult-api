const path = require('path');
const fs = require('fs');

console.log('=== DIAGNÓSTICO DE RUTAS ===');
console.log('__dirname:', __dirname);

const filePath = path.join(__dirname, '../data/espacios.json');
console.log('Ruta calculada:', filePath);

try {
  if (fs.existsSync(filePath)) {
    console.log('✅ El archivo existe.');
    const data = fs.readFileSync(filePath, 'utf8');
    console.log('📄 Contenido del archivo:');
    console.log(data);
    
    try {
      const espacios = JSON.parse(data);
      console.log('✅ JSON parseado correctamente.');
      console.log(`📦 Cantidad de espacios: ${espacios.length}`);
    } catch (parseError) {
      console.error('❌ Error al parsear JSON:', parseError.message);
    }
  } else {
    console.error('❌ El archivo NO existe en esa ruta.');
    console.log('Listado de archivos en la carpeta data:');
    const dataPath = path.join(__dirname, '../data');
    if (fs.existsSync(dataPath)) {
      const files = fs.readdirSync(dataPath);
      console.log(files);
    } else {
      console.log('❌ La carpeta data/ no existe.');
    }
  }
} catch (error) {
  console.error('❌ Error inesperado:', error.message);
}