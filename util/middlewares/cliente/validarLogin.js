const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

function validarLogin(req, res, next) {
  const { usuario, contrasenia } = req.body;
  sequelize.query('SELECT usuario FROM cliente WHERE usuario = ?', { replacements: [usuario], type: sequelize.QueryTypes.SELECT })
    .then(response => {
      if (response.length) {
        sequelize.query('SELECT contrasenia FROM cliente WHERE contrasenia = ?', { replacements: [contrasenia], type: sequelize.QueryTypes.SELECT })
          .then(response => {
            if (response.length) {
              return next();
            } else {
              return res.status(400).json({ 'error': 'La contraseña no es correcta' })
            }
          })
      } else {
        return res.status(400).json({ 'error': 'El usuario ingresado no es correcto' });
      }
    })
}

module.exports = validarLogin;