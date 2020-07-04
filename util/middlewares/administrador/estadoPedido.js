const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

function estadoPedido(req, res, next) {
  const { idPedido } = req.query;
  sequelize.query('SELECT * FROM usuariosPedidos WHERE idPedido = ?',
    { replacements: [idPedido], type: sequelize.QueryTypes.SELECT })
    .then(response => {
      if (response.length) {
        if (response[0].IdEstado === 6 || response[0].IdEstado === 5) {
          return res.status(400).json({
            "mensajePedido": "La operación no se puede hacer porque el pedido esta en estado *entregado* o *cancelado*"
          })
        } else {
          return next();
        }
      }
    })
};

module.exports = estadoPedido