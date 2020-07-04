const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

function hayPedidos(req, res, next) {
  sequelize.query('SELECT * FROM usuariosPedidos',
    { type: sequelize.QueryTypes.SELECT })
    .then(response => {
      if (response.length) {
        return next();
      } else {
        return res.status(204).json({
          "mensaje": "No hay pedidos disponibles para mostrar",
        })
      }
    })
};

module.exports = hayPedidos;