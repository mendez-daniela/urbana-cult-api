# 8. MIDDLEWARES Y MANEJO DE ERRORES

En la arquitectura de Express, un middleware es una función intermedia que se ejecuta en el ciclo de vida de una solicitud HTTP (`req`), con acceso a la respuesta (`res`) y a la función `next()`. Esta última es la encargada de ceder el control al siguiente middleware o controlador en la cadena de ejecución.

---

## 8.1. Middlewares implementados en el proyecto

En Urbana Cult API, el archivo principal `src/app.js` registra e integra middlewares tanto personalizados como nativos para auditar, procesar y transformar el tráfico entrante:

1. **Middleware logger personalizado (`src/middlewares/logger.js`)**
   Se registra de forma global mediante `app.use(logger)` al inicio de la aplicación. Su función principal es la auditoría y el monitoreo en consola: captura cada petición entrante e imprime la marca de tiempo local junto con el método HTTP y la URL consultada.

2. **Middleware de archivos estáticos (`express.static`)**
   Configurado para exponer el directorio raíz `/public` (`app.use(express.static(...))`). Permite servir recursos multimedia (como el logotipo de la aplicación utilizado en las cabeceras de las plantillas Pug) de forma directa y optimizada sin pasar por los controladores de la aplicación.

3. **Parseadores de datos de petición**
   - **`express.json()`**: Habilita el procesamiento automático de cuerpos de solicitudes entrantes formateados en JSON. Es fundamental para el correcto funcionamiento de los endpoints de la API REST cuando recibe payloads desde clientes externos o herramientas como Postman.
   - **`express.urlencoded({ extended: true })`**: Procesa y decodifica la información enviada desde los formularios HTML/Pug a través del método `POST`, transformando la cadena codificada en un objeto JavaScript accesible mediante `req.body`.

---

## 8.2. Manejo de errores y excepciones

El tratamiento de excepciones en la aplicación está estructurado tanto en la capa de controladores como mediante bloques de captura asíncrona:

1. **Captura en controladores (`try/catch`)**
   Todas las funciones de los controladores (`espacioController.js` y `webController.js`) envuelven las operaciones de base de datos en bloques `try/catch`. En caso de fallos de validación en Mongoose o errores de conexión con MongoDB, la aplicación responde enviando un estado HTTP adecuado (`500 Internal Server Error` o `400 Bad Request`) junto con un mensaje descriptivo en formato JSON para la API o renderizando una plantilla con el mensaje de error para el usuario web.

2. **Gestión de rutas no encontradas (404)**
   Las peticiones solicitadas a endpoints no definidos en las rutas son interceptadas al final del flujo de Express, retornando una respuesta estándar de recurso no encontrado y evitando que el servidor quede colgado sin responder.
