# 5. Estructura del Proyecto

El proyecto **Urbana Cult API** adopta una arquitectura basada en el patrón de diseño **Modelo-Vista-Controlador (MVC)**, garantizando la separación de responsabilidades y la modularidad del código backend.

## Organización de Archivos y Directorios

```text
urbana-cult-api/
├── docs/                    # Documentación técnica del proyecto
│   ├── 01-introduccion.md   # Introducción y objetivos del proyecto
│   ├── 02-tecnologias.md     # Tecnologías y dependencias utilizadas
│   ├── 03-instalacion.md    # Guía de instalación y entorno local
│   ├── 04-base-de-datos.md  # Configuración de MongoDB y Mongoose
│   ├── 05-estructura.md     # Estructura del proyecto y patrón MVC
│   ├── 06-modelos.md        # Definición del modelo Espacio y validaciones
│   ├── 07-rutas-api.md      # Documentación de endpoints de la API REST
│   ├── 08-middlewares.md    # Middlewares (logger, static, parsers)
│   ├── 09-pug.md            # Motor de vistas Pug e interfaz web
│   └── 10-conclusiones.md   # Conclusiones del trabajo práctico
├── public/                  # Recursos estáticos (imágenes, logos, CSS)
│   └── logo-icono.png
├── src/
│   ├── config/              # Configuración e inicialización de servicios
│   │   └── db.js            # Conexión a MongoDB mediante Mongoose
│   ├── controllers/         # Lógica de negocio y manejo de peticiones
│   │   ├── espacioController.js  # Controlador de la API REST (JSON)
│   │   └── webController.js      # Controlador de la interfaz Web (Pug)
│   ├── middlewares/         # Middlewares personalizados
│   │   └── logger.js        # Middleware de registro de solicitudes HTTP
│   ├── models/              # Modelos y esquemas de datos
│   │   └── Espacio.js       # Esquema Mongoose con validaciones del dominio
│   ├── routes/              # Definición de rutas y endpoints
│   │   ├── espacioRoutes.js # Rutas de la API REST (/api/espacios)
│   │   └── webRoutes.js     # Rutas de navegación web (/)
│   ├── views/               # Plantillas del motor de vistas Pug
│   │   ├── detalleEspacio.pug
│   │   ├── editarEspacio.pug
│   │   ├── espacios.pug
│   │   └── nuevoEspacio.pug
│   └── app.js               # Punto de entrada principal de la aplicación
├── .env                     # Variables de entorno (MONGO_URI, PORT)
├── package.json             # Dependencias del proyecto y scripts
└── README.md                # Documentación principal del repositorio
```

## Descripción de cada capa:

- **docs/**: Almacena los módulos en formato Markdown que conforman la documentación técnica e informe del proyecto.
- **public/**: Contiene los archivos estáticos, como los logos de Urbana Cult (`logo-icono.png`).
- **src/config/**: Contiene el archivo `db.js`, encargado de establecer y gestionar la conexión asíncrona con la base de datos MongoDB mediante Mongoose.
- **src/controllers/**: Actúa como intermediario recibiendo las solicitudes HTTP; opera con el modelo de Mongoose (`Espacio`) y retorna respuestas en formato JSON (`espacioController.js`) o renderiza vistas web (`webController.js`).
- **src/middlewares/**: Contiene las funciones intermediarias del servidor, como `logger.js`, encargadas de interceptar, auditar y registrar las peticiones HTTP antes de que lleguen a los controladores.
- **src/models/**: Contiene el esquema de Mongoose (`Espacio.js`), que define la estructura de los documentos en MongoDB, centralizando las reglas de validación y la lógica de persistencia.
- **src/routes/**: Define las rutas de la API REST (`/api/espacios`) y las rutas de navegación web (`/espacios`), direccionando las peticiones a sus respectivos controladores.
- **src/views/**: Almacena las plantillas Pug (`espacios.pug`, `nuevoEspacio.pug`, `editarEspacio.pug`, `detalleEspacio.pug`) que conforman la interfaz web dinámica del CRUD.
- **src/app.js**: Es el punto de entrada principal del servidor, donde se inicializa la aplicación Express, se establece la conexión a MongoDB, se configuran los middlewares globales, se define Pug como motor de plantillas y se registran las rutas base.
