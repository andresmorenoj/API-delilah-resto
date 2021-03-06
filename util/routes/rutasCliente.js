const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const firmaSegura = 'jue098742onc_234?*23WDS';
const router = express.Router();
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

// ENDPOINTS

// Registrar
router.post('/registro', (req, res) => {
  const { administrador, usuario, nombreApellido, correo, telefono, direccion, contrasenia } = req.body;
  sequelize.query('INSERT INTO usuario (idUsuario, administrador, usuario, nombreApellido, correo, telefono, direccion, contrasenia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    { replacements: [null, administrador, usuario, nombreApellido, correo, telefono, direccion, contrasenia] })
  res.status(201).json('usuario creado')
});

// Ver información personal
router.get('/:usuario/ver/informacion/', (req, res) => {
  const { idUsuario } = req.query
  sequelize.query('SELECT * FROM usuario WHERE idUsuario = ?', { replacements: [idUsuario], type: sequelize.QueryTypes.SELECT })
    .then(response => res.json(response))
});

// Realizar pedido
router.post('/:usuario/pedido', (req, res) => {
  const { idPlato, idPago } = req.body;
  const { idUsuario } = req.query;
  sequelize.query('SET FOREIGN_KEY_CHECKS=0');
  sequelize.query('INSERT INTO usuariosPedidos (idUsuario, idPlato, idPago, idEstado, idPedido, fechaModificacion) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
    { replacements: [idUsuario, idPlato, idPago, 1, null] })
    .then(response => {
      res.status(201).json({ "mensaje": "La validadción del cliente y los comapos fue exitosa. El pedido fue creado", response })
    })
});

// Editar información personal
router.put('/:usuario/editar/informacion', (req, res) => {
  const { usuario, nombreApellido, correo, telefono, direccion, contrasenia } = req.body;
  const { idUsuario } = req.query;
  sequelize.query('UPDATE usuario SET usuario = ?, nombreApellido = ?, correo = ?, telefono = ?, direccion = ?, contrasenia = ? WHERE idUsuario = ?',
    { replacements: [usuario, nombreApellido, correo, telefono, direccion, contrasenia, idUsuario] })
    .then(response => {
      res.status(201).json({ "mensaje": "La información se actualizó con éxito." })
    })
});

// Editar plato
router.put('/:usuario/editar/plato', (req, res) => {
  res.status(400).json({ "mensaje": "Acceso denegado" })
});

// Editar pedido
router.put('/:usuario/editar/pedido', (req, res) => {
  res.status(400).json({ "mensaje": "Acceso denegado" })
});

// Eliminar plato
router.delete('/:usuario/eliminar/plato', (req, res) => {
  res.status(400).json({ "mensaje": "Acceso denegado" })
});

// Eliminar pedido
router.delete('/:usuario/eliminar/pedido', (req, res) => {
  res.status(400).json({ "mensaje": "Acceso denegado" })
});

module.exports = { router, firmaSegura };