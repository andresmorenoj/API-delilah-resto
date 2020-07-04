const { firmaSegura } = require('../../routes/rutasAdministrador');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

function esAdmin(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { idUsuario } = req.query;
    const verificarToken = jwt.verify(token, firmaSegura);
    sequelize.query('SELECT usuario, idUsuario, administrador FROM usuario WHERE usuario = ?', { replacements: [verificarToken.usuario], type: sequelize.QueryTypes.SELECT })
      .then(response => {
        console.log(response);

        if (response[0].usuario === verificarToken.usuario && response[0].idUsuario === parseInt(idUsuario) && response[0].administrador === 1) {
          return next();
        } else {
          return res.status(401).json({ 'mensaje': 'No se pudo autenticar al usuario como administador.' })
        }
      })
  } catch (error) {
    return res.status(400).json({ error: "acceso denegado - Intenta de nuevo." });
  }
}

module.exports = esAdmin;