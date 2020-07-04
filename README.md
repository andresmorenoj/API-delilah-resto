# API-delilah-resto

**Proyecto de Acamica para crear una API Resfull con Node.js, Express y SQL**

---

> **API RESTFULL para el proyecto final de Acámica. API Delilah Restó permite crear usuarios para hacer pedidos al resaturante, de igual forma permite que un usuario administrador pueda ejecutar el CRUD completo de la API.**

---

## Tecnologías utilizadas en el proyecto

1. Node.js
2. Express
3. MySQL
4. Sequelize
5. JsonWebToken
6. Swagger
7. Nodemon7. Postman

---

## Instalación e inicializacion del proyecto

### 1 - Clonar o descargar el proyecto:

Clonar el repositorio desde el siguiente link. --> [Link del repositorio](http://https://github.com/andresmorenoj/API-delilah-resto "Link del repositorio")

### En tu consola o terminal ejecutar:

Posicionate en la carpeta o directorio donde quieres clonar el proyecto.
Luego desde la consola ejecuta el comando :tw-2b07:

    git clone https://github.com/andresmorenoj/API-delilah-resto

> Esto clonará todo el contenido del repositorio

### Ahora instala las dependencias:

Para instalar las dependencias solo debes ejecutar desde tu terminal o consola el siguiente comando.
:tw-2b07:

    npm install

### Es tiempo de importar la base de datos

1. Abre el programa XAMPP o MAMP
   > Si no tienes ninguno de estos programas, a continuación de dejo los links correspondientes para que los descargues es instales Si no tienes ninguno de estos programas, a continuación de dejo los links correspondientes para que los descargues es instales

##### **Links de desdecarga:**

    	XAMPP: https://www.apachefriends.org/es/index.html
    	MAMP: https://www.mamp.info/en/windows/

2. Inicializar los servicios de Apache y MySQL
3. Una vez iniciados los servicios, podemos ingresar a la página de** phpMyAdmin** donde importaremos nuestra base de datos.
4. En **phpMyAdmin **crea una nueva base de datos con el nombre de tu preferencia.
5. A continuación vas a seleccionar la opción de **importar** en **phpMyAdmin** y vas a buscar el archivo **dbDelilahResto.sql** localizado en el directorio **base_de_datos**. Este directorio se debió haber descargado cuando se clonó el proyecto, por lo cual debe estar en la carpeta raíz de tu proyecto.
6. Una vez importada la base de datos, procedemos a configurar nuestro servidor.
   1. En los directorios del proyecto** (routes y middlewares)** hay varios archivos de JavaScript que corresponden a las rutas y middlewares utilizados para realizar las peticiones a la API. Dentro de cada uno de esos archivos de JavaScript vas a identificar la línea de código que sea igual a esta: **`const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto')`** Por lo general esa línea de código siempre va a estar en las primeras líneas de cada archivo.
   2. Ahora que ya identificaste la línea de código que te indiqué, deberás reemplazar la información en ella por la de tu servidor, es decir, donde dice `127.0.0.1:8889` deberás reemplazarlo por la dirección IP y puerto que te da XAMPP o MAMP cuando los ejecutas, en la mayoria de los casos la **IP** es igual a como se muestra en el archivo o puede ser **localhost**. Luego al final de la línea de código aparece `Delilah_Resto` **el cual corresponde al nombre de la base de datos**. Si el nombre que le pusiste a tu base de datos en los pasos anteriores es diferente al del nombre que aparece por defecto, deberás cambiar el nombre en la línea de código por el que pusiste en tu base de datos.

### Ahora iniciemos nuestro servidor

En la terminal o consola ejecuta el siguiente comando:
`npm run dev`
Este comando iniciará el servidor en el puerto **3000**, si por algun motivo te sale un error, tal vez sea porque tienes el **puerto 3000 ocupado** en otro proceso por lo cual te recomiendo lo siguiente:

1. Termina el proceso que tienes ejecutando actualmente en el **puerto 3000** para que lo puedas utilizar en el proyecto.
2. Si no puedes terminar con ese proceso, entonces abre el archivo **api.js** localizado en el directorio raíz del proyecto, luego ubica la línea de comando que dice `const PORT = 3000` y cambia el **3000** por **4000** o cualquier otro puerto que tengas disponible pero que no sea el mismo del de la base de datos.

### Documentación de los Endpoints

Ahora que nuestro servidor de **Node.js** esta corriendo y la base de datos esta **creada y conectada** a nuestro servidor, es hora de testear nuestros endpoints y hacer peticiones a nuestra API.

Para ello, dirigete al siguiente enlace donde encontrarás la documentación sobre cómo hacer las peticiones tanto para un cliente como para el administrador.

Link de la documentación en **Swagger** --> [Documentación oficial de la API](http://https://app.swaggerhub.com/apis-docs/andresmorenoj/API_Delilah-Resto_Andres-Moreno/1.0.0#/ "Documentación oficial de la API")

---

#### Nota:

Utiliza postman para hacer las peticiones.
