const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const firmaSegura = 'jue098742onc_234?*23WDS';
const routerAdmin = express.Router();
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

router.use(bodyParser());

// ENDPOINTS

// Crear plato
routerAdmin.post('/:administrador/crear/plato', (req, res) => {
  const { nombreLargo, nombreCorto, foto, precio } = req.body;
  const { idAdministrador } = req.query;

})





module.exports = { routerAdmin, firmaSegura };