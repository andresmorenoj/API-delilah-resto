const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
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
});

// Realizar pedido
router.post('/:usuario/pedido', (req, res) => {
  const { idPlato, idPago } = req.body;
  const { idCliente } = req.query;
  sequelize.query('SET FOREIGN_KEY_CHECKS=0');
  sequelize.query('INSERT INTO usuariosPedidos (idCliente, idPlato, idPago, idEstado, idPedido, fechaModificacion) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
    { replacements: [idCliente, idPlato, idPago, 1, null] })
    .then(response => {
      res.status(201).json({ "mensaje": "La validadción del cliente y los comapos fue exitosa. El pedido fue creado", response })
    })
});

// Editar información personal
router.put('/:usuario/editar/informacion', (req, res) => {
  const { usuario, nombreApellido, correo, telefono, direccion, contrasenia } = req.body;
  const { idCliente } = req.query;
  sequelize.query('UPDATE cliente SET usuario = ?, nombreApellido = ?, correo = ?, telefono = ?, direccion = ?, contrasenia = ? WHERE idCliente = ?',
    { replacements: [usuario, nombreApellido, correo, telefono, direccion, contrasenia, idCliente] })
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