const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

function platoExiste(req, res, next) {
  const { idPlato } = req.query;
  sequelize.query('SELECT * FROM plato WHERE idPlato = ?',
    { replacements: [idPlato], type: sequelize.QueryTypes.SELECT })
    .then(response => {
      if (response.length) {
        return next()
      } else {
        return res.status(204).json({
          "mensaje": "No se encontró un plato con el ID ingresado",
          "idPlato": idPlato,
        })
      }
    })
};

module.exports = platoExiste