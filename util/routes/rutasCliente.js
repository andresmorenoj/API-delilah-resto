const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const firmaSegura = 'jue098742onc_234?*23WDS';
const router = express.Router();
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

router.use(bodyParser());

// ENDPOINTS

// Registrar
router.post('/registro', (req, res) => {
  const { administrador, usuario, nombreApellido, correo, telefono, direccion, contrasenia } = req.body;
  sequelize.query('INSERT INTO cliente (idCliente, administrador, usuario, nombreApellido, correo, telefono, direccion, contrasenia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    { replacements: [null, administrador, usuario, nombreApellido, correo, telefono, direccion, contrasenia] })
  res.status(201).json('usuario creado')
});

// Login
router.post('/login', (req, res) => {
  const { usuario } = req.body;
  const token = jwt.sign({ usuario }, firmaSegura);
  res.json({ 'mensaje': 'El login del usuaio fue correcto y se generó el Token.', token });
})

// Listar los platos
router.get('/:usuario/platos/todos', (req, res) => {
  sequelize.query('SELECT * FROM plato', { type: sequelize.QueryTypes.SELECT })
    .then(response => res.json(response));
})

// Ver información personal
router.get('/:usuario/ver/informacion/', (req, res) => {
  const { idCliente } = req.query
  sequelize.query('SELECT * FROM cliente WHERE idCliente = ?', { replacements: [idCliente], type: sequelize.QueryTypes.SELECT })
    .then(response => res.json(response))
})

module.exports = { router, firmaSegura };