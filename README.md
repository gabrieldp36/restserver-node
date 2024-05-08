# Rest Server.

El objeto de esta aplicación fue desarrollar un rest server robusto con rutas protegidas, validaciones, uso de middewares, manejo de archivos, autenticación manual y mediante Google Sign In, todo ello en conjunto con MongoDB.

Simula un rest server que utilizaría una cafetería para organizar y administar su plantilla de empleados y su stock, este último estructurado por categorías y productos, permitiendo realizar búsquedas insensibles de usuarios, categorías, productos en particular y productos por categorías.

A continuación les copio el link a la documentación que sirve de guía para comprender el uso de cada uno de los servicios implementados: https://documenter.getpostman.com/view/17109440/2sA3JKd2ta

Para probar el Google Sign In, pueden ingresar al siguiente link. Luego en postman pueden consultar el listado de usuarios y verificar que el mismo ha sido correctamente creado.

```
https://restserver-node-production-87fa.up.railway.app/
```

### Notas:

Recuerden reconstuir los módulos de Node:

```
npm install
```

y, no olviden ingresar: 1. la cadena de conexión a su base de datos (MongoDB); 2. su secret or private key para la creación de JSON Web Tokens; 3. sus Google Client ID y Google Secret ID (para autenticación con Google Sign In); 4. su Cloudinary URL para cargar y mostrar imágenes de productos.

Tal información debe ser ingresada en el archivo example.env, debiendo renombrar tal archivo de la siguiente manera:

```
.env
```

Luego, para correr el servidor en desarrollo, ejecuten el siguiente comando:

```
node app
```