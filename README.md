# Urbana Cult API

API RESTful para la gestión de espacios culturales de la red Urbana Cult, una plataforma colaborativa que agrupa centros culturales independientes, teatros autogestionados y salas de música del circuito Balvanera, San Cristóbal, Almagro y Boedo (Comunas 3 y 5 de CABA).

Desarrollada con Node.js, Express, MongoDB, Mongoose y Pug, siguiendo el patrón MVC, con sistema de autenticación y persistencia en base de datos NoSQL.

🌐 **Aplicación en vivo (Producción):** [https://urbana-cult-api.vercel.app](https://urbana-cult-api.vercel.app)
📁 **Repositorio:** [https://github.com/mendez-daniela/urbana-cult-api](https://github.com/mendez-daniela/urbana-cult-api)

---

## Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
| :--- | :--- |
| **Node.js** | Entorno de ejecución para JavaScript en el servidor. |
| **Express** | Framework para la creación de rutas y middlewares. |
| **MongoDB Atlas** | Base de datos NoSQL en la nube. |
| **Mongoose** | ODM (Object Data Modeling) para modelar los datos y validarlos. |
| **Pug** | Motor de plantillas para renderizar vistas HTML dinámicas. |
| **bcryptjs** | Librería para hashear contraseñas de forma segura. |
| **express-session** | Middleware para manejar sesiones de usuario. |
| **connect-mongo** | Almacenamiento de sesiones en MongoDB (para producción). |
| **Vercel** | Plataforma de despliegue en la nube. |
| **Postman** | Herramienta para pruebas de integración de los endpoints. |
| **Git / GitHub** | Control de versiones y alojamiento del repositorio. |

---

## Instalación y ejecución

### Requisitos previos

- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js)
- **MongoDB Atlas** (cuenta gratuita) o **MongoDB Local**.

### Clonar el repositorio

```bash
git clone https://github.com/mendez-daniela/urbana-cult-api.git
cd urbana-cult-api
```

### Instalar dependencias

```bash
npm install
```

### Configurar las Variables de Entorno

En la raíz del proyecto, crear un archivo **`.env`** con el siguiente contenido:

```env
MONGO_URI=<tu_uri_de_conexion>
PORT=4000
SESSION_SECRET=urbana-cult-secret-key-2026
NODE_ENV=development
```

La variable `MONGO_URI` debe ser la URL de conexión a tu base de datos:

- **MongoDB Atlas (Recomendado):** `mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/urbana-cult?retryWrites=true&w=majority`
- **MongoDB Local:** `mongodb://localhost:27017/urbana-cult`

**Nota:** el archivo `.env` está en `.gitignore`, por lo que no se sube al repositorio.

### Iniciar el servidor

```bash
npm run dev
```

Resultado esperado:
```
MongoDB conectado correctamente
Servidor corriendo en http://localhost:4000
```

### Abrir en el navegador
```
http://localhost:4000
```

---

## Despliegue en Producción (Vercel + MongoDB Atlas)

La aplicación se encuentra desplegada en **Vercel** y conectada a una base de datos en **MongoDB Atlas**.

🔗 **URL Pública:** [https://urbana-cult-api.vercel.app](https://urbana-cult-api.vercel.app)

Para el despliegue, se configuraron las variables de entorno en el panel de Vercel y se utilizó `connect-mongo` para persistir las sesiones de usuario en la base de datos, garantizando el correcto funcionamiento del login en un entorno Serverless.

---

## Estructura del proyecto

```
urbana-cult-api/
├── public/                            # Archivos estáticos (logos)
├── src/
│   ├── assets/
│   │   └── capturas-interfaz/         # Capturas de pantalla de la interfaz
│   ├── config/
│   │   ├── db.js                      # Conexión a MongoDB
│   │   └── barrios.js                 # Barrios válidos por comuna
│   ├── controllers/
│   │   ├── espacioController.js       # Controlador de la API REST
│   │   ├── webController.js           # Controlador de las vistas web
│   │   └── authController.js          # Controlador de login/registro/logout
│   ├── docs/
│   │   ├── 05-estructura.md
│   │   ├── 08-middlewares.md
│   │   └── 09-pug.md
│   ├── middlewares/
│   │   ├── logger.js                  # Middleware de logging
│   │   ├── autenticado.js             # Middleware que protege rutas privadas
│   │   └── errorHandler.js            # Middleware global de manejo de errores
│   ├── models/
│   │   ├── Espacio.js                 # Schema de Mongoose para espacios
│   │   └── Usuario.js                 # Schema de Mongoose para usuarios
│   ├── routes/
│   │   ├── espacioRoutes.js           # Rutas de la API REST
│   │   ├── webRoutes.js               # Rutas de las vistas web
│   │   └── authRoutes.js              # Rutas de autenticación
│   ├── views/
│   │   ├── espacios.pug               # Lista de espacios
│   │   ├── detalleEspacio.pug         # Detalle de un espacio
│   │   ├── nuevoEspacio.pug           # Formulario de creación
│   │   ├── editarEspacio.pug          # Formulario de edición
│   │   ├── login.pug                  # Formulario de login
│   │   └── registro.pug               # Formulario de registro
│   └── app.js                         # Punto de entrada del servidor
├── tests/                             # Carpeta de pruebas
│   └── postman_collection.json        # Colección de Postman con pruebas de la API
├── .env                               # Variables de entorno (no subido a Git)
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
└── README.md
```

---

## Endpoints de la API

### API REST (Endpoints de Espacio)

| Método | Endpoint | Descripción | Código exitoso |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/espacios` | Obtiene todos los espacios (paginación opcional con `?pagina=1&limite=10`). | 200 OK |
| **GET** | `/api/espacios/:id` | Obtiene un espacio por su ObjectID. | 200 OK / 404 |
| **POST** | `/api/espacios` | Crea un nuevo espacio. | 201 Created / 400 |
| **PUT** | `/api/espacios/:id` | Actualiza un espacio existente. | 200 OK / 400 / 404 |
| **DELETE** | `/api/espacios/:id` | Elimina un espacio por su ObjectID. | 200 OK / 404 |

### Autenticación (Endpoints de Usuario)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/login` | Muestra formulario de login. |
| **POST** | `/login` | Procesa las credenciales. |
| **GET** | `/registro` | Muestra formulario de registro. |
| **POST** | `/registro` | Crea una cuenta nueva. |
| **GET** | `/logout` | Cierra la sesión. |

### Vistas web (protegidas)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/espacios` | Lista todos los espacios. |
| **GET** | `/espacios/nuevo` | Formulario de creación. |
| **POST** | `/espacios/crear` | Crea un nuevo espacio. |
| **GET** | `/espacios/editar/:id` | Formulario de edición. |
| **POST** | `/espacios/actualizar/:id` | Actualiza un espacio. |
| **GET** | `/espacios/eliminar/:id` | Elimina un espacio. |
| **GET** | `/espacios/detalle/:id` | Detalle de un espacio. |

### Ejemplo de body para POST/PUT

```json
{
  "nombre": "Centro Cultural Abasto",
  "direccion": "Av. Corrientes 3200",
  "barrio": "Balvanera",
  "comuna": 3,
  "capacidad": 150,
  "descripcion": "Espacio dedicado a teatro independiente y talleres culturales.",
  "telefono": "11-2345-6789"
}
```

---

## Sistema de autenticación

### Modelo `Usuario`
El modelo `Usuario` (en `src/models/Usuario.js`) define:
- **email**: String, obligatorio, único, formato válido.
- **password**: String, obligatorio, mínimo 6 caracteres, **hasheado con bcrypt**.

### Flujo de autenticación
1. **Registro:** el usuario se registra en `/registro`. La contraseña se hashea automáticamente con `bcryptjs` antes de guardarse.
2. **Login:** el usuario ingresa sus credenciales en `/login`. Se comparan con el hash usando `bcrypt.compare()`.
3. **Sesión:** se crea una sesión con `express-session` y se guarda el `usuarioId` y `usuarioEmail`.
4. **Protección de rutas:** el middleware `autenticado.js` verifica que el usuario esté logueado antes de acceder a las rutas web.
5. **Logout:** se destruye la sesión y se redirige a `/login`.

### Seguridad
- **Hash de contraseñas:** `bcryptjs` con 10 rondas de salt. Las contraseñas nunca se guardan en texto plano.
- **Sesiones:** `express-session` con almacenamiento en MongoDB (`connect-mongo`) para producción.
- **Protección de rutas:** el middleware `autenticado` bloquea el acceso a `/espacios` sin login.
- **Variables de entorno:** `MONGO_URI` y `SESSION_SECRET` se guardan en `.env` (no en el código).

---

## Validaciones del modelo

Las validaciones se implementan directamente en el Schema de Mongoose (`src/models/Espacio.js`):

| Campo | Validación |
|---|---|
| **nombre** | Obligatorio. Único. No puede ser solo espacios en blanco. |
| **direccion** | Obligatoria. Debe incluir al menos un número. |
| **comuna** | Obligatoria. Solo se aceptan los valores 3 o 5. |
| **barrio** | Obligatorio. Debe corresponder a la comuna seleccionada. |
| **capacidad** | Obligatoria. Número entre **1 y 1000**. |
| **descripcion** | Opcional. |
| **telefono** | Opcional. Solo números, guiones, espacios y el signo `+`. |
| **_id** | Generado automáticamente por MongoDB (ObjectID). |

### Validación de coherencia comuna-barrio
El sistema verifica que el barrio ingresado corresponda a la comuna seleccionada:
- **Comuna 3**: Balvanera, San Cristóbal.
- **Comuna 5**: Almagro, Boedo.

**Normalización aplicada:** el validador normaliza mayúsculas/minúsculas, espacios y tildes antes de comparar.

---

## Integrantes y responsabilidades

| Integrante | Rol | Responsabilidades |
| :--- | :--- | :--- |
| **Méndez, Daniela Ester** | Líder Técnico / Backend | Configuración de MongoDB Atlas, despliegue en Vercel, actualización del README, Diagrama de Clases, redacción de las secciones de Arquitectura y Despliegue, unificación del PDF final y coordinación de la entrega. |
| **Prinzen, Sol Agustina** | Documentación / Testing de Interfaz | Armado del Diagrama de Casos de Uso, redacción del texto que explica los diagramas nuevos, Testing de Interfaz, diseño de portada y formato del PDF, y explicación de la interfaz web en el video. |
| **Sosa, Lucas Eliel** | Testing / Documentación | Pruebas de integración con Postman (API en Vercel), redacción de la sección de Pruebas y Resultados, Conclusión Final, edición y publicación del video. |

---

## Estado del proyecto

### Primera Entrega
- CRUD completo con persistencia en archivo JSON.
- Interfaz web con Pug.
- Middleware de logging.

### Segunda Entrega
- ✅ Migración a MongoDB con Mongoose.
- ✅ Schema de Espacio con validaciones.
- ✅ Schema de Usuario con hash de contraseña.
- ✅ Sistema de autenticación completo.

### Tercera Entrega (Final)
- ✅ **Despliegue en la nube:** Vercel + MongoDB Atlas.
- ✅ **Sesiones persistidas:** `connect-mongo` para producción.
- ✅ **Paginación** en la API REST.
- ✅ **Índices en MongoDB** para mejorar el rendimiento.
- ✅ **Seguridad:** cookies `httpOnly` y `secure` para producción.
- ✅ **CORS y Compresión** configurados.
- ✅ **Manejo de errores centralizado** (sin exponer detalles en producción).
- ✅ **Documentación completa** (README, diagramas, PDF).

---

## Uso de herramientas de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizaron herramientas de inteligencia artificial como **apoyo complementario** en las siguientes áreas:

| Herramienta | Uso |
| :--- | :--- |
| **ChatGPT / Gemini / DeepSeek** | Consultas sobre sintaxis de Mongoose, resolución de dudas técnicas, configuración de despliegue en Vercel/Atlas y redacción de documentación. |
| **Claude (Claude Code)** | Asistencia en la implementación del selector dinámico de barrios según comuna en las vistas Pug y ajustes menores de código. |

### Declaración
El equipo asume la **responsabilidad total** sobre el contenido del proyecto. La IA se utilizó como una **herramienta de productividad**, no como un sustituto del criterio profesional ni de las decisiones de ingeniería.

---

## Bibliografía y recursos

- **Node.js:** https://nodejs.org
- **Express.js:** https://expressjs.com
- **MongoDB:** https://www.mongodb.com
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas/
- **Mongoose:** https://mongoosejs.com
- **Pug:** https://pugjs.org
- **bcryptjs:** https://www.npmjs.com/package/bcryptjs
- **express-session:** https://www.npmjs.com/package/express-session
- **connect-mongo:** https://www.npmjs.com/package/connect-mongo
- **Vercel:** https://vercel.com
- **Postman:** https://www.postman.com
- **MDN Web Docs:** https://developer.mozilla.org
- **GitHub:** https://github.com

---

## Mejoras a futuro

- Integración con **pasarelas de pago** y **split de pagos** (Fase 3).
- Módulo de **reserva de salas de ensayo**.
- **Dashboard** de métricas para los representantes de los espacios.
- Sistema de **roles** (admin / usuario común).
- **Autenticación por JWT** para la API REST (actualmente pública para facilitar las pruebas con Postman).
- Recuperación de contraseña por email.

---

## Licencia

Proyecto desarrollado con fines académicos para la materia **Desarrollo de Sistemas Web (Back End)** – IFTS 29 – Comisión A 2026.