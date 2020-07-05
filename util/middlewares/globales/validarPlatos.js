const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

function validarPlatos(req, res, next) {
  sequelize.query('SELECT * FROM plato', { type: sequelize.QueryTypes.SELECT })
    .then(response => {
      if (response.length) {
        return next();
      } else {
        return res.status(204).json({ "mensaje": "No hay platos disponibles para mostrar." });
      }
    });
}

module.exports = validarPlatos;