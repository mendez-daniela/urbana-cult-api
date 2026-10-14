# 9. MOTOR DE PLANTILLAS PUG Y VISTAS

## 9.1 Integración de Pug

Para la presentación de la aplicación web, se integró el motor de plantillas Pug, el cual permite renderizar vistas HTML dinámicas en el servidor a partir de los datos procesados por Node.js y Mongoose. La configuración se realizó en el servidor principal (`src/app.js`), estableciendo a Pug como motor de renderizado oficial y definiendo la carpeta `views` como contenedora de las plantillas.

A diferencia del enfoque anterior basado en persistencia local en JSON, cuando el cliente accede a las rutas `/espacios`, el servidor realiza consultas asíncronas hacia la base de datos distribuida en MongoDB Atlas a través de los modelos de Mongoose, transmitiendo la información procesada a la vista en tiempo real.

---

## 9.2 Estructura y Arquitectura de las Vistas (`layout.pug`)

Las plantillas de Pug prescinden de las etiquetas de cierre tradicionales de HTML y emplean una estructura limpia basada en sangrías para definir la jerarquía del código. La carpeta `/src/views` se organizó de forma modular mediante una arquitectura basada en herencia y componentes reutilizables:

- **Herencia mediante `extends layout`:** Las vistas hijas heredan de una plantilla maestra, garantizando una apariencia visual uniforme y evitando la duplicación de código estructural.
- **Inyección con `block content`:** Define bloques de contenido dinámico donde cada vista inyecta su HTML específico dentro de la estructura base del layout.
- **Renderizado de datos dinámicos:** Los controladores de Express transmiten variables hacia las plantillas para visualizar la sesión del usuario autenticado, colecciones de objetos recuperadas desde MongoDB Atlas y mensajes de estado o error.

Dentro de esta estructura, las vistas principales del proyecto se distribuyen de la siguiente manera:

- `layout.pug`: Plantilla base que define el maquetado global de la aplicación.
- `index.pug`: Landing page y bienvenida principal al sistema.
- `login.pug` y `registro.pug`: Formularios de autenticación para el ingreso y alta de usuarios en la base de datos.
- `espacios/`: Directorio que agrupa las plantillas para el ciclo CRUD de los espacios culturales (`index.pug`, `detalle.pug`, `nuevo.pug` y `editar.pug`).

---

## 9.3 Interfaz Web para el CRUD de Espacios Culturales

Además de los endpoints de la API REST, se implementó una interfaz web dinámica mediante Pug que permite a los usuarios autenticados gestionar el ciclo de vida completo de los espacios culturales directamente desde el navegador:

1. **Lista de espacios (`espacios/index.pug`):**  
   Despliega una tabla dinámica con los espacios culturales registrados, detallando su ID, nombre, dirección, barrio, comuna y capacidad. En su lógica, verifica si la base de datos contiene registros para iterar sobre la colección; en caso de que esté vacía, muestra un mensaje alternativo indicando que no hay espacios disponibles. Cada fila incluye el panel de acciones (_Ver_, _Editar_, _Eliminar_) y el acceso para dar de alta un nuevo espacio.

2. **Formulario de alta (`espacios/nuevo.pug`):**  
   Dispone de un formulario con los campos requeridos para dar de alta un nuevo espacio cultural (nombre, dirección, barrio, comuna, capacidad, descripción y teléfono). Al procesar el envío (`POST`), la información se persiste en MongoDB Atlas mediante Mongoose y la aplicación redirige automáticamente al listado principal.

3. **Vista de detalle (`espacios/detalle.pug`):**  
   Muestra la ficha completa e individual de un espacio mediante su ID, permitiendo visualizar la información en detalle junto con datos secundarios como la descripción y el teléfono.

4. **Formulario de edición (`espacios/editar.pug`):**  
   Presenta un formulario pre-completado dinámicamente con los datos actuales recuperados de la base de datos, facilitando la actualización de cualquier campo mediante el controlador correspondiente.

5. **Eliminación con confirmación:**  
   Cada registro en la lista incluye la opción de borrado. Al hacer clic, se activa una ventana interactiva de confirmación en el navegador (`confirm()`). Si el usuario acepta, el servidor remueve el documento de MongoDB Atlas y actualiza la vista redirigiendo a `/espacios`.

> **Nota sobre el diseño:** La interfaz web se implementó con Pug, incluyendo estilos CSS básicos incrustados en las vistas para mejorar la legibilidad y la experiencia del usuario. El foco del proyecto estuvo en el desarrollo del backend (API REST, CRUD, middleware y POO), por lo que el diseño visual se mantuvo simple y funcional.
