const express = require('express');
const rutasCliente = require('./util/routes/rutasCliente');
const bodyParser = require('body-parser');

const api = express();
const PORT = 3000;
api.use(bodyParser());

api.listen(PORT, () => console.log(`Servidor iniciado en el puerto --> ${PORT}`));

// MIDDLEWARES CLIENTE
const peticionMalEviada = require('./util/middlewares/cliente/peticionMalEnviada');
const usuarioYaExiste = require('./util/middlewares/cliente/usuarioExiste');
const validarLogin = require('./util/middlewares/cliente/validarLogin');

// ENDPOINTS CLIENTE

// Registrar a un cliente
api.post('/registro', peticionMalEviada, usuarioYaExiste, rutasCliente);

// Login cliente
api.post('/login', validarLogin, rutasCliente);