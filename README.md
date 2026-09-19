# Urbana Cult API

API RESTful para la gestión de espacios culturales de la red Urbana Cult, una plataforma colaborativa que agrupa centros culturales independientes, teatros autogestionados y salas de música del circuito Balvanera, San Cristóbal, Almagro y Boedo (Comunas 3 y 5 de CABA).

Desarrollada con Node.js, Express y Pug, siguiendo el patrón MVC y con persistencia en un archivo JSON.

---

## Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
| :--- | :--- |
| **Node.js** | Entorno de ejecución para JavaScript en el servidor. |
| **Express** | Framework para la creación de rutas y middlewares. |
| **Pug** | Motor de plantillas para renderizar vistas HTML dinámicas. |
| **JSON** | Formato de persistencia de datos (archivo `espacios.json`). |
| **Postman** | Herramienta para pruebas de integración de los endpoints. |
| **Git / GitHub** | Control de versiones y alojamiento del repositorio. |
| **Visual Studio Code** | Editor de código utilizado para el desarrollo. |

---

## Instalación y ejecución

### Requisitos previos

- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js)

### Pasos

**1. Clonar el repositorio:**

```bash
git clone https://github.com/mendez-daniela/urbana-cult-api.git
cd urbana-cult-api
```

**2. Instalar dependencias:**

```bash
npm install
```

**3. Iniciar el servidor:**

```bash
npm start
```

**Modo desarrollo con nodemon:**

```bash
npm run dev
```


**4. Abrir en el navegador:**

```
http://localhost:4000/espacios
```

---

## Endpoints de la API

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/espacios` | Obtiene todos los espacios culturales. |
| **GET** | `/api/espacios/:id` | Obtiene un espacio por su ID. |
| **POST** | `/api/espacios` | Crea un nuevo espacio. |
| **PUT** | `/api/espacios/:id` | Actualiza un espacio existente. |
| **DELETE** | `/api/espacios/:id` | Elimina un espacio por su ID. |

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

## Validaciones del modelo

| Campo | Validación |
| :--- | :--- |
| **nombre** | Obligatorio. No puede estar vacío ni ser solo espacios. Debe ser único. |
| **direccion** | Obligatoria. Debe incluir al menos un número. |
| **barrio** | Obligatorio. |
| **comuna** | Obligatoria. Solo se aceptan los valores 3 o 5. |
| **capacidad** | Obligatoria. Número entre **1 y 1000**. |
| **telefono** | Opcional. Solo números, guiones, espacios y el signo `+`. |
| **id** | No se puede modificar desde el body en las actualizaciones. |

---

## Interfaz web (Pug)

Además de la API REST, el proyecto incluye una interfaz web que permite realizar todas las operaciones del CRUD desde el navegador:

| Ruta | Vista | Descripción |
| :--- | :--- | :--- |
| `/espacios` | `espacios.pug` | Lista todos los espacios con botones de acción. |
| `/espacios/nuevo` | `nuevoEspacio.pug` | Formulario para crear un nuevo espacio. |
| `/espacios/detalle/:id` | `detalleEspacio.pug` | Muestra la ficha completa de un espacio. |
| `/espacios/editar/:id` | `editorEspacio.pug` | Formulario para editar un espacio existente. |

---

## Integrantes y responsabilidades

| Integrante | Rol | Responsabilidades |
| :--- | :--- | :--- |
| **Méndez, Daniela Ester** | Líder Técnico / Backend | Configuración inicial, estructura de carpetas, rutas, CRUD, base de datos JSON y middleware `logger.js`. Redacción de introducción, objetivos y POO. |
| **Prinzen, Sol Agustina** | Desarrolladora Frontend / Testing | Implementación de Pug, diseño de `espacios.pug` y redacción de la sección de Middleware e integración de Pug. Colaboración en verificación. |
| **Sosa, Lucas Eliel** | Testing y documentación | Pruebas en Postman, capturas de pantalla (GET, POST, PUT, DELETE), redacción de la sección de pruebas y bibliografía. |

---

## Bibliografía y recursos

- **Node.js:** https://nodejs.org
- **Express.js:** https://expressjs.com
- **Pug:** https://pugjs.org
- **Postman:** https://www.postman.com
- **JSON (MDN Web Docs):** https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON
- **Visual Studio Code:** https://code.visualstudio.com
- **GitHub:** https://github.com

---

## Mejoras a futuro

- Implementación de **autenticación de usuarios**.
- Migración a una **base de datos real** (MongoDB).
- Integración con **pasarelas de pago** y **split de pagos**.
- Módulo de **reserva de salas de ensayo**.
- **Dashboard** de métricas para los representantes de los espacios.

### Sobre el campo "Barrio" y "Comuna"

Se evaluó la posibilidad de eliminar el campo **"Barrio"**, ya que la sección **"Comuna"** hace referencia a la misma zona. Sin embargo, esto generaría cierta ambigüedad, porque una comuna puede contener dos o más barrios, y no se estaría seleccionando el barrio específico.

En el caso de Urbana Cult, las Comunas 3 y 5 abarcan Balvanera, San Cristóbal, Almagro y Boedo. Pero si el proyecto se expandiera a otras comunas, la dirección por sí sola no siempre bastaría para deducir el barrio. Esta simplificación podría evaluarse en futuras versiones del modelo de datos.

---

## Licencia

Proyecto desarrollado con fines académicos para la materia **Desarrollo de Sistemas Web (Back End)** – IFTS 29 – Comisión A 2026.
