# 5. Estructura del Proyecto

El proyecto **Urbana Cult API** adopta una arquitectura basada en el patrón de diseño **Modelo-Vista-Controlador (MVC)**, garantizando la separación de responsabilidades y la modularidad del código backend.

## Organización de Archivos y Directorios

```text
urbana-cult-api/
├── public/				# Archivos estáticos (logos)
├── src/
│   ├── assets/
│   │   └── capturas-interfaz/	# Capturas de de la interfaz de Pug
│   ├── config/
│   │   ├── db.js			# Conexión a MongoDB
│   │   └── barrios.js		# Barrios válidos por comuna
│   ├── controllers/
│   │   ├── espacioController.js	# Controlador de la API REST
│   │   ├── webController.js	# Controlador de las vistas web
│   │   └── authController.js	# Controlador de login/registro/logout
│   ├── docs/				# Documentación técnica del proyecto
│   ├── middlewares/
│   │   ├── logger.js			# Middleware de logging
│   │   ├── autenticado.js		# Middleware que protege rutas privadas
│   │   └── errorHandler.js		# Middleware global de manejo de errores
│   ├── models/
│   │   ├── Espacio.js		# Schema de Mongoose para espacios
│   │   └── Usuario.js		# Schema de Mongoose para usuarios
│   ├── routes/
│   │   ├── espacioRoutes.js	# Rutas de la API REST
│   │   ├── webRoutes.js		# Rutas de las vistas web
│   │   └── authRoutes.js		# Rutas de autenticación
│   ├── views/
│   │   ├── espacios.pug		# Lista de espacios
│   │   ├── detalleEspacio.pug	# Detalle de un espacio
│   │   ├── nuevoEspacio.pug	# Formulario de creación
│   │   ├── editarEspacio.pug	# Formulario de edición
│   │   ├── login.pug			# Formulario de login
│   │   └── registro.pug		# Formulario de registro
│   └── app.js				# Punto de entrada del servidor
├── tests/
│   └── postman_collection.json	# Colección de pruebas de integración de Postman
├── .env					# Variables de entorno (no subido a Git)
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
└── README.md
```

### Descripción de cada capa:

- **`docs/`**: Almacena los módulos en formato Markdown que conforman la documentación técnica e informe del proyecto.
- **`public/`**: Contiene los archivos estáticos, como los logos y recursos multimedia de Urbana Cult.
- **`src/assets/`**: Contiene los recursos gráficos y capturas de pantalla de la interfaz visual utilizadas para documentar el funcionamiento de las vistas Pug.
- **`src/config/`**: Contiene el archivo `db.js`, encargado de establecer y gestionar la conexión asíncrona con la base de datos MongoDB mediante Mongoose, y `barrios.js` con la configuración de comunas y barrios permitidos.
- **`src/controllers/`**: Actúa como intermediario recibiendo las solicitudes HTTP; opera con los modelos de Mongoose (`Espacio` y `Usuario`) y retorna respuestas en formato JSON (`espacioController.js`) o renderiza vistas web (`webController.js` y `authController.js`).
- **`src/middlewares/`**: Contiene las funciones intermediarias del servidor (`logger.js`, `autenticado.js`, `errorHandler.js`), encargadas de interceptar, auditar, proteger rutas y manejar errores globalmente antes o después de llegar a los controladores.
- **`src/models/`**: Contiene los esquemas de Mongoose (`Espacio.js` y `Usuario.js`), que definen la estructura de los documentos en MongoDB, centralizando las reglas de validación y la lógica de persistencia.
- **`src/routes/`**: Define las rutas de la API REST (`/api/espacios`), las rutas de navegación web (`/espacios`) y de autenticación (`/login`, `/registro`, `/logout`), direccionando las peticiones a sus respectivos controladores.
- **`src/views/`**: Almacena las plantillas Pug (`espacios.pug`, `nuevoEspacio.pug`, `editarEspacio.pug`, `detalleEspacio.pug`, `login.pug`, `registro.pug`) que conforman la interfaz web dinámica del CRUD y la autenticación.
- **`src/app.js`**: Es el punto de entrada principal del servidor, donde se inicializa la aplicación Express, se establece la conexión a MongoDB, se configuran los middlewares globales, se define Pug como motor de plantillas y se registran las rutas base.
- **`tests/`**: Almacena la suite de pruebas de integración exportada de Postman (`postman_collection.json`) para verificar los endpoints de la API REST.
- **`.env`**: Archivo de configuración local para gestionar variables de entorno sensibles (como la URI de conexión a MongoDB y la clave secreta de sesiones) sin exponerlas en el control de versiones.
