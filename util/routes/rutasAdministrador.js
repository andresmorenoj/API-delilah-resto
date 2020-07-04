const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const firmaSegura = 'jue098742onc_234?*23WDS';
const routerAdmin = express.Router();
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

routerAdmin.use(bodyParser());

// ENDPOINTS

// Crear plato
routerAdmin.post('/:administrador/crear/plato', (req, res) => {
  const { nombreLargo, nombreCorto, foto, precio } = req.body;
  const { idUsuario } = req.query;
  sequelize.query('INSERT INTO plato (idPlato, nombreLargo, nombreCorto, foto, precio) VALUES (?, ?, ?, ?, ?)',
    { replacements: [null, nombreLargo, nombreCorto, foto, precio] })
  res.status(201).json({
    "mensajeAutenticacion": "La autenticacion del asuario fue exitosa y corresponde a un administrador.",
    "mensajePlato": "El plato se creó con exito.",
    "plato": {
      "nombreLargo": nombreLargo,
      "nombreCorto": nombreCorto,
      "foto": foto,
      "precio": precio
    }
  })
});

// Listar platos por ID
routerAdmin.get('/:administrador/platos', (req, res) => {
  const { idPlato } = req.query;
  sequelize.query('SELECT * FROM plato WHERE idPlato = ?',
    { replacements: [idPlato], type: sequelize.QueryTypes.SELECT })
    .then(response => {
      res.json({ "mensaje": "Validación del administrador realizada con éxito.", response })
    })
});

// Listar pedidos
routerAdmin.get('/:administrador/pedidos/todos', (req, res) => {
  sequelize.query('SELECT * FROM usuariosPedidos', { type: sequelize.QueryTypes.SELECT })
    .then(response => {
      res.json({ "mensaje": "Validación del administrador realizada con éxito.", response })
    })
});




module.exports = { routerAdmin, firmaSegura };