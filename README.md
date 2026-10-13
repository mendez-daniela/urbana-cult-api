# Urbana Cult API

API RESTful para la gestión de espacios culturales de la red Urbana Cult, una plataforma colaborativa que agrupa centros culturales independientes, teatros autogestionados y salas de música del circuito Balvanera, San Cristóbal, Almagro y Boedo (Comunas 3 y 5 de CABA).

Desarrollada con Node.js, Express, MongoDB, Mongoose y Pug, siguiendo el patrón MVC, con sistema de autenticación y persistencia en base de datos NoSQL.

---

## Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
| :--- | :--- |
| **Node.js** | Entorno de ejecución para JavaScript en el servidor. |
| **Express** | Framework para la creación de rutas y middlewares. |
| **MongoDB** | Base de datos NoSQL orientada a documentos. |
| **Mongoose** | ODM (Object Data Modeling) para modelar los datos y validarlos. |
| **Pug** | Motor de plantillas para renderizar vistas HTML dinámicas. |
| **bcryptjs** | Librería para hashear contraseñas de forma segura. |
| **express-session** | Middleware para manejar sesiones de usuario. |
| **Postman** | Herramienta para pruebas de integración de los endpoints. |
| **Git / GitHub** | Control de versiones y alojamiento del repositorio. |
| **Visual Studio Code** | Editor de código utilizado para el desarrollo. |

---

## Instalación y ejecución

### Requisitos previos

- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js)
- **MongoDB** (instalado y corriendo como servicio local)

### Instalación de MongoDB

Si no tenés MongoDB instalado, descargalo desde:
https://www.mongodb.com/try/download/community

Una vez instalado, verificá que el servicio esté corriendo:

```bash
sc query MongoDB
```

Debería mostrar `STATE : 4 RUNNING`.

### Clonar el repositorio

```bash
git clone https://github.com/mendez-daniela/urbana-cult-api.git
cd urbana-cult-api
```

### Instalar dependencias

```bash
npm install
```

### Crear el archivo `.env`

En la raíz del proyecto, crear un archivo `.env` con el siguiente contenido:

```
MONGO_URI=mongodb://localhost:27017/urbana-cult
PORT=4000
SESSION_SECRET=urbana-cult-secret-key-2026
```

**Nota:** el archivo `.env` está en `.gitignore`, por lo que no se sube al repositorio.

### Iniciar el servidor

Modo desarrollo con nodemon:

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

Te va a redirigir a `/login` (si no estás logueado) o a `/espacios` (si ya lo estás).

---

## Estructura del proyecto

```
api-json-crud/
├── public/                            # Archivos estáticos (logos)
├── src/
│   ├── config/
│   │   ├── db.js                      # Conexión a MongoDB
│   │   └── barrios.js                 # Barrios válidos por comuna
│   ├── controllers/
│   │   ├── espacioController.js       # Controlador de la API REST
│   │   ├── webController.js           # Controlador de las vistas web
│   │   └── authController.js          # Controlador de login/registro/logout
│   ├── middlewares/
│   │   ├── logger.js                  # Middleware de registro de peticiones
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
│   │   ├── nuevoEspacio.pug           # Formulario de creación
│   │   ├── editarEspacio.pug          # Formulario de edición
│   │   ├── detalleEspacio.pug         # Detalle de un espacio
│   │   ├── login.pug                  # Formulario de login
│   │   └── registro.pug               # Formulario de registro
│   └── app.js                         # Punto de entrada del servidor
├── .env                               # Variables de entorno (no subido a Git)
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Endpoints de la API

### API REST (pública)

| Método | Endpoint | Descripción | Código exitoso |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/espacios` | Obtiene todos los espacios culturales. | 200 OK |
| **GET** | `/api/espacios/:id` | Obtiene un espacio por su ObjectID. | 200 OK / 404 |
| **POST** | `/api/espacios` | Crea un nuevo espacio. | 201 Created / 400 |
| **PUT** | `/api/espacios/:id` | Actualiza un espacio existente. | 200 OK / 400 / 404 |
| **DELETE** | `/api/espacios/:id` | Elimina un espacio por su ObjectID. | 200 OK / 404 |

### Autenticación (pública)

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

| Campo | Tipo | Validación |
|---|---|---|
| **email** | String | Obligatorio, único, formato válido |
| **password** | String | Obligatorio, mínimo 6 caracteres, **hasheado con bcrypt** |

### Flujo de autenticación

1. **Registro:** el usuario se registra en `/registro`. La contraseña se hashea automáticamente con `bcryptjs` antes de guardarse.
2. **Login:** el usuario ingresa sus credenciales en `/login`. Se comparan con el hash usando `bcrypt.compare()`.
3. **Sesión:** se crea una sesión con `express-session` y se guarda el `usuarioId` y `usuarioEmail`.
4. **Protección de rutas:** el middleware `autenticado.js` verifica que el usuario esté logueado antes de acceder a las rutas web de espacios.
5. **Logout:** se destruye la sesión y se redirige a `/login`.

### Seguridad

- **Hash de contraseñas:** se usa `bcryptjs` con 10 rondas de salt. Las contraseñas nunca se guardan en texto plano.
- **Sesiones:** se manejan con `express-session` con cookies firmadas.
- **Protección de rutas:** el middleware `autenticado` bloquea el acceso a `/espacios` sin login.
- **Variables de entorno:** `SESSION_SECRET` y `MONGO_URI` se guardan en `.env` (no en el código).

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

**Normalización aplicada:** el validador normaliza mayúsculas/minúsculas, espacios y tildes antes de comparar. Esto significa que el usuario puede escribir `San Cristóbal`, `San Cristobal`, `SAN CRISTOBAL` o ` san cristobal ` y todos son aceptados.

**Escalabilidad:** la configuración de barrios por comuna está centralizada en `src/config/barrios.js`. Si el proyecto crece a más comunas, solo hay que agregar entradas en ese archivo.

---

## Integrantes y responsabilidades

| Integrante | Rol | Responsabilidades |
| :--- | :--- | :--- |
| **Méndez, Daniela Ester** | Líder Técnico / Backend | Migración a MongoDB con Mongoose, definición del Schema, controladores con async/await, sistema de autenticación, conexión a la base de datos, coordinación y documentación técnica. |
| **Prinzen, Sol Agustina** | Documentación / Testing de Interfaz | Redacción de secciones técnicas (estructura, middlewares, Pug), pruebas de interfaz web y diseño del video. |
| **Sosa, Lucas Eliel** | Testing / Documentación | Pruebas de integración con Postman, documentación de bugs, bibliografía, declaración de IA y edición del video. |

---

## Estado del proyecto

### Parte 1 (completada)
- CRUD completo con persistencia en archivo JSON.
- Interfaz web con Pug.
- Middleware de logging.

### Parte 2 (actual)
- ✅ Migración a MongoDB con Mongoose.
- ✅ Schema de Espacio con validaciones (incluida la validación comuna-barrio).
- ✅ Schema de Usuario con hash de contraseña.
- ✅ Controladores refactorizados con async/await.
- ✅ Manejo de errores (duplicados, validaciones, IDs inválidos).
- ✅ Vistas Pug adaptadas a ObjectIDs de MongoDB.
- ✅ **Sistema de autenticación completo** (registro, login, logout, protección de rutas).
- ✅ Eliminación de archivos obsoletos (JSON).
- ✅ Configuración de barrios centralizada y escalable.

---

## Uso de herramientas de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizaron herramientas de inteligencia artificial como **apoyo complementario** en las siguientes áreas:

| Herramienta | Uso |
| :--- | :--- |
| **ChatGPT / Gemini / DeepSeek** | Consultas sobre sintaxis de Mongoose, resolución de dudas técnicas, generación de ejemplos de código y redacción de documentación. |

### Decisiones humanas

Todas las decisiones fundamentales del proyecto fueron **concebidas y validadas por los integrantes del equipo**:

- **Arquitectura:** patrón MVC, separación de controladores (API vs web vs auth), uso de Mongoose como ODM.
- **Diseño del Schema:** campos, tipos de datos, validaciones del dominio.
- **Validación comuna-barrio:** lógica personalizada que verifica que el barrio corresponda a la comuna, con normalización de tildes, mayúsculas y espacios.
- **Sistema de autenticación:** uso de `bcryptjs` para hash, `express-session` para sesiones, middleware `autenticado` para proteger rutas.
- **Lógica del CRUD:** operaciones, manejo de errores, códigos HTTP.
- **Elección de tecnologías:** MongoDB, Mongoose, Pug, Express, bcryptjs, express-session.

### Validación del contenido generado por IA

Todo el contenido generado con apoyo de IA fue:

1. **Revisado** por los integrantes del equipo.
2. **Adaptado** al contexto específico del proyecto (Urbana Cult).
3. **Probado** antes de su incorporación (pruebas con Postman, navegador y MongoDB Compass).
4. **Verificado** contra los requisitos de la consigna.

### Declaración

El equipo asume la **responsabilidad total** sobre el contenido del proyecto. La IA se utilizó como una **herramienta de productividad**, no como un sustituto del criterio profesional ni de las decisiones de ingeniería.

---

## Bibliografía y recursos

- **Node.js:** https://nodejs.org
- **Express.js:** https://expressjs.com
- **MongoDB:** https://www.mongodb.com
- **Mongoose:** https://mongoosejs.com
- **Pug:** https://pugjs.org
- **bcryptjs:** https://www.npmjs.com/package/bcryptjs
- **express-session:** https://www.npmjs.com/package/express-session
- **Postman:** https://www.postman.com
- **MDN Web Docs:** https://developer.mozilla.org
- **Visual Studio Code:** https://code.visualstudio.com
- **GitHub:** https://github.com

---

## Mejoras a futuro

- Integración con **pasarelas de pago** y **split de pagos**.
- Módulo de **reserva de salas de ensayo**.
- **Dashboard** de métricas para los representantes de los espacios.
- Migración a **MongoDB Atlas** (base de datos en la nube).
- Sistema de **roles** (admin / usuario común).
- Recuperación de contraseña por email.

---

## Licencia

Proyecto desarrollado con fines académicos para la materia **Desarrollo de Sistemas Web (Back End)** – IFTS 29 – Comisión A 2026.