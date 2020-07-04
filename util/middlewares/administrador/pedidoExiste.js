const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

function pedidoExiste(req, res, next) {
  const { idPedido } = req.query;
  sequelize.query('SELECT * FROM usuariosPedidos WHERE idPedido = ?',
    { replacements: [idPedido], type: sequelize.QueryTypes.SELECT })
    .then(response => {
      if (response.length) {
        return next()
      } else {
        return res.status(204).json({
          "mensaje": "No se encontró el pedido con el ID especificado.",
          "idPlato": idPedido,
        })
      }
    })
};

module.exports = pedidoExiste