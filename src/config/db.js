const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    // URL de conexión directa para evitar problemas con las variables de entorno en Vercel
    const url = "mongodb+srv://novalynany_db_user:F1qN2QcvatuUqjO7@cluster0.n7laymu.mongodb.net/urbana-cult?retryWrites=true&w=majority&serverSelectionTimeoutMS=5000&family=4";
    
    await mongoose.connect(url);
    
    console.log('MongoDB conectado correctamente');
  } catch (error) {
    console.error('Error al conectar MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;