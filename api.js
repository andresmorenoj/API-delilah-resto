const express = require('express');
const { router } = require('./util/routes/rutasCliente');
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

// ENDPOINTS CLIENTE

// Registrar a un cliente
api.post('/registro', peticionMalEviada, usuarioYaExiste, router);

// Login cliente
api.post('/login', validarLogin, router);

// Listar los platos - Cliente
api.get('/:usuario/platos/todos', autenticacionToken, validarPlatos, router);

// Ver información personal
api.get('/:usuario/ver/informacion', autenticacionToken, validarInformacion, router);

// Realizar pedido
api.post('/:usuario/pedido', autenticacionToken, validarInformacion, validarPlatos, router)