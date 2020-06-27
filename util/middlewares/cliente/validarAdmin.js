const { firmaSegura } = require('../../routes/rutasCliente');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

function validarAdmin(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { idCliente } = req.query;
    const verificarToken = jwt.verify(token, firmaSegura);
    sequelize.query('SELECT usuario, idCliente, administrador FROM cliente WHERE usuario = ?', { replacements: [verificarToken.usuario], type: sequelize.QueryTypes.SELECT })
      .then(response => {
        console.log(response);

        if (response[0].usuario === verificarToken.usuario && response[0].idCliente === parseInt(idCliente) && response[0].administrador === 0) {
          return next();
        } else {
          return res.status(401).json({ 'mensaje': 'La información no corresponde a la del cliente logueado' })
        }
      })
  } catch (error) {
    return res.status(400).json({ error: "acceso denegado - Intenta de nuevo." });
  }
}

module.exports = validarAdmin;