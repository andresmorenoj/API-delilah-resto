const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const firmaSegura = 'jue098742onc_234?*23WDS';
const router = express.Router();
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

router.use(bodyParser());

// ENDPOINTS

// Registrar a un cliente
router.post('/registro', (req, res) => {
  const { usuario, nombreApellido, correo, telefono, direccion, contrasenia } = req.body;
  sequelize.query('INSERT INTO cliente (idCliente, usuario, nombreApellido, correo, telefono, direccion, contrasenia) VALUES (?, ?, ?, ?, ?, ?, ?)',
    { replacements: [null, usuario, nombreApellido, correo, telefono, direccion, contrasenia] })
  res.status(201).json('usuario creado')
});

// Login cliente
router.post('/login', (req, res) => {
  const { usuario } = req.body;
  const token = jwt.sign({ usuario }, firmaSegura);
  res.json({ 'mensaje': 'El login del usuaio fue correcto y se generó el Token.', token });
})

module.exports = router