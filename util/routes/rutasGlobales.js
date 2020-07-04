const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const firmaSegura = 'jue098742onc_234?*23WDS';
const globalRouter = express.Router();
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

globalRouter.use(bodyParser());

// Login
globalRouter.post('/login', (req, res) => {
  const { usuario } = req.body;
  const token = jwt.sign({ usuario }, firmaSegura);
  res.json({ 'mensaje': 'El login del usuaio fue correcto y se generó el Token.', token });
});

// Listar los platos
globalRouter.get('/:usuario/platos/todos', (req, res) => {
  sequelize.query('SELECT * FROM plato', { type: sequelize.QueryTypes.SELECT })
    .then(response => res.json(response));
});

module.exports = { globalRouter, firmaSegura };