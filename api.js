const express = require('express');
const { router } = require('./util/routes/rutasCliente');
const { routerAdmin } = require('./util/routes/rutasAdministrador');
const { globalRouter } = require('./util/routes/rutasGlobales');
const bodyParser = require('body-parser');

const api = express();
const PORT = 3000;
api.use(bodyParser());

api.listen(PORT, () => console.log(`Servidor iniciado en el puerto --> ${PORT}`));

// MIDDLEWARES CLIENTE
const peticionMalEviada = require('./util/middlewares/cliente/peticionMalEnviada');
const usuarioYaExiste = require('./util/middlewares/cliente/usuarioExiste');
const validarLogin = require('./util/middlewares/cliente/validarLogin');
const validarPlatos = require('./util/middlewares/cliente/validarPlatos');
const autenticacionToken = require('./util/middlewares/cliente/autenticacionToken')
const validarInformacion = require('./util/middlewares/cliente/validarInformacion')
const validarAdmin = require('./util/middlewares/cliente/validarAdmin');

// MIDDLEWARES ADMINISTRADOR
const esAdmin = require('./util/middlewares/administrador/esAdmin');
const validarCrearPlato = require('./util/middlewares/administrador/validarCrearPlato');
const platoExiste = require('./util/middlewares/administrador/platoExiste');
const hayPedidos = require('./util/middlewares/administrador/hayPedidos');

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