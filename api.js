const express = require('express');
const { router } = require('./util/routes/rutasCliente');
const { routerAdmin } = require('./util/routes/rutasAdministrador');
const { globalRouter } = require('./util/routes/rutasGlobales');
const bodyParser = require('body-parser');

const api = express();
const PUERTO = process.env.PORT || 3000;
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({
  extended: true
}));

api.listen(PUERTO, () => console.log(`Servidor iniciado en le puero ----> ${PUERTO}`));

// MIDDLEWARES GLOBALES
const validarLogin = require('./util/middlewares/globales/validarLogin');
const validarPlatos = require('./util/middlewares/globales/validarPlatos');
const autenticacionToken = require('./util/middlewares/globales/autenticacionToken');

// MIDDLEWARES CLIENTE
const peticionMalEviada = require('./util/middlewares/cliente/peticionMalEnviada');
const usuarioYaExiste = require('./util/middlewares/cliente/usuarioExiste');
const validarInformacion = require('./util/middlewares/cliente/validarInformacion');
const validarAdmin = require('./util/middlewares/cliente/validarAdmin');

// MIDDLEWARES ADMINISTRADOR
const esAdmin = require('./util/middlewares/administrador/esAdmin');
const validarCrearPlato = require('./util/middlewares/administrador/validarCrearPlato');
const platoExiste = require('./util/middlewares/administrador/platoExiste');
const hayPedidos = require('./util/middlewares/administrador/hayPedidos');
const pedidoExiste = require('./util/middlewares/administrador/pedidoExiste');
const estadoPedido = require('./util/middlewares/administrador/estadoPedido');

//ENPOINTS GLOBALES

// Login cliente - Administrador
api.post('/login', validarLogin, globalRouter);

// Listar los platos - Cliente - Administrador
api.get('/:usuario/platos/todos', autenticacionToken, validarPlatos, globalRouter);

// ENDPOINTS CLIENTE

// Registrar a un cliente
api.post('/registro', peticionMalEviada, usuarioYaExiste, router);

// Ver información personal
api.get('/:usuario/ver/informacion', autenticacionToken, validarInformacion, router);

// Realizar pedido
api.post('/:usuario/pedido', autenticacionToken, validarInformacion, validarPlatos, router);

// Editar información personal
api.put('/:usuario/editar/informacion', autenticacionToken, validarInformacion, router);

// Editar plato
api.put('/:usuario/editar/plato', validarAdmin, router);

// Editar pedido
api.put('/:usuario/editar/pedido', validarAdmin, router);

// Eliminar plato
api.delete('/:usuario/eliminar/plato', validarAdmin, router);

// Eliminar pedido
api.delete('/:usuario/eliminar/pedido', validarAdmin, router);

// ENDPOINTS ADMINSTRADOR

// Crear plato
api.post('/:administrador/crear/plato', esAdmin, validarCrearPlato, routerAdmin);

// Listar platos por ID
api.get('/:administrador/platos', esAdmin, platoExiste, routerAdmin);

// Listar pedidos
api.get('/:administrador/pedidos/todos', esAdmin, hayPedidos, routerAdmin);

// Listar pedido por ID
api.get('/:administrador/pedidos', esAdmin, pedidoExiste, routerAdmin);

// Editar pedido
api.put('/:administrador/actualizar/pedido', esAdmin, pedidoExiste, estadoPedido, routerAdmin);

// Editar plato
api.put('/:administrador/actualizar/plato', esAdmin, platoExiste, routerAdmin);

// Eliminar plato
api.delete('/:administrador/borrar/plato', esAdmin, platoExiste, routerAdmin);

// Eliminar pedido
api.delete('/:administrador/borrar/pedido', esAdmin, pedidoExiste, routerAdmin);