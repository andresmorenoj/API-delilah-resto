const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const router = express.Router();
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

router.use(bodyParser())

/* router.get('/prueba', (req, res) => {
  sequelize.query('SELECT * FROM cliente', { type: sequelize.QueryTypes.SELECT })
    .then(response => res.json(console.log(response)))
})
 */

// ENDPOINTS

// Registrar a un cliente
router.post('/registro', (req, res) => {
  const { usuario, nombreApellido, correo, telefono, direccion, contrasenia } = req.body
  sequelize.query('INSERT INTO cliente (idCliente, usuario, nombreApellido, correo, telefono, direccion, contrasenia) VALUES (?, ?, ?, ?, ?, ?, ?)',
    { replacements: [null, usuario, nombreApellido, correo, telefono, direccion, contrasenia] })
  res.status(201).json('usuario creado')
})

module.exports = router