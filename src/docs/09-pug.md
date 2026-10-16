# 9. MOTOR DE PLANTILLAS PUG Y VISTAS

## 9.1 Integración de Pug

Para la presentación de la aplicación web, se integró el motor de plantillas **Pug**, el cual permite renderizar vistas HTML dinámicas en el servidor a partir de los datos procesados por Node.js y Mongoose. La configuración se realizó en el servidor principal (`src/app.js`), estableciendo a Pug como motor de renderizado oficial y definiendo la carpeta `views` como contenedora de las plantillas.

A diferencia del enfoque anterior basado en persistencia local en JSON, cuando el cliente accede a las rutas `/espacios`, el servidor realiza consultas asíncronas hacia la base de datos MongoDB a través de los modelos de Mongoose, transmitiendo la información procesada a la vista en tiempo real.

---

## 9.2 Estructura y arquitectura de las vistas

Las plantillas de Pug prescinden de las etiquetas de cierre tradicionales de HTML y emplean una estructura limpia basada en sangrías para definir la jerarquía del código. La carpeta `/src/views` contiene las siguientes vistas:

- **`espacios.pug`**: Lista dinámica de espacios culturales con tabla de datos y panel de acciones (Ver, Editar, Eliminar).
- **`detalleEspacio.pug`**: Ficha individual de un espacio cultural.
- **`nuevoEspacio.pug`**: Formulario de alta de un nuevo espacio.
- **`editarEspacio.pug`**: Formulario de edición pre-completado con los datos actuales recuperados desde MongoDB.
- **`login.pug`**: Formulario de inicio de sesión.
- **`registro.pug`**: Formulario de alta de un nuevo usuario.

Los controladores de Express transmiten variables hacia las plantillas para renderizar datos dinámicos recuperados desde MongoDB: la colección de espacios culturales, la sesión del usuario autenticado y los mensajes de estado o error.

---

## 9.3 Interfaz web para el CRUD de espacios culturales

Además de los endpoints de la API REST, se implementó una interfaz web dinámica mediante Pug que permite a los usuarios autenticados gestionar el ciclo de vida completo de los espacios culturales directamente desde el navegador:

- **Lista de espacios (`espacios.pug`)**:  
  Despliega una tabla dinámica con los espacios culturales registrados, detallando su ID, nombre, dirección, barrio, comuna y capacidad. En su lógica, verifica si la base de datos contiene registros para iterar sobre la colección; en caso de que esté vacía, muestra un mensaje alternativo indicando que no hay espacios disponibles. Cada fila incluye el panel de acciones (Ver, Editar, Eliminar) y el acceso para dar de alta un nuevo espacio.

- **Formulario de alta (`nuevoEspacio.pug`)**:  
  Dispone de un formulario con los campos requeridos para dar de alta un nuevo espacio cultural (nombre, dirección, barrio, comuna, capacidad, descripción y teléfono). Al procesar el envío (`POST`), la información se persiste en MongoDB mediante Mongoose y la aplicación redirige automáticamente al listado principal.

- **Vista de detalle (`detalleEspacio.pug`)**:  
  Muestra la ficha completa e individual de un espacio mediante su ID, permitiendo visualizar la información en detalle junto con datos secundarios como la descripción y el teléfono.

- **Formulario de edición (`editarEspacio.pug`)**:  
  Presenta un formulario pre-completado dinámicamente con los datos actuales recuperados de la base de datos, facilitando la actualización de cualquier campo mediante el controlador correspondiente.

- **Eliminación con confirmación**:  
  Cada registro en la lista incluye la opción de borrado. Al hacer clic, se activa una ventana interactiva de confirmación en el navegador (`confirm()`). Si el usuario acepta, el servidor remueve el documento de MongoDB y actualiza la vista redirigiendo a `/espacios`.

> **Nota sobre el diseño:** La interfaz web se implementó con Pug, incluyendo estilos CSS básicos incrustados en las vistas para mejorar la legibilidad y la experiencia del usuario. El foco del proyecto estuvo en el desarrollo del backend (API REST, CRUD, middleware y POO), por lo que el diseño visual se mantuvo simple y funcional.
