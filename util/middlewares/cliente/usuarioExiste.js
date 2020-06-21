const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

function usuarioYaExiste(req, res, next) {
  const { usuario, correo } = req.body
  sequelize.query('SELECT usuario FROM cliente WHERE usuario = ?', { replacements: [usuario], type: sequelize.QueryTypes.SELECT })
    .then(response => {
      if (response.length) {
        return res.status(409).json('El usuario ya existe')
      } else {
        sequelize.query('SELECT correo FROM cliente WHERE correo = ?', { replacements: [correo], type: sequelize.QueryTypes.SELECT })
          .then(reponse => {
            if (reponse.length) {
              return res.status(409).json('El correo ya existe');
            } else {
              return next()
            }
          })
      }
    })
}
module.exports = usuarioYaExiste;