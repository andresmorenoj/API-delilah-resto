const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/Delilah_Resto');

function validarCrearPlato(req, res, next) {
  const { nombreLargo, nombreCorto, foto, precio } = req.body;
  sequelize.query('SELECT * FROM plato WHERE nombreLargo = ?',
    { replacements: [nombreLargo], type: sequelize.QueryTypes.SELECT })
    .then(response => {
      if (response.length) {
        return res.status(409).json({
          "mensaje": "El plato que estas intentado crear ya se encuentra registrado. Intenta nuevamente con un plato diferente",
          "plato": {
            "nombreLargo": nombreLargo,
            "nombreCorto": nombreCorto,
            "foto": foto,
            "precio": precio
          }
        })
      } else {
        sequelize.query('SELECT * FROM plato WHERE nombreCorto = ?',
          { replacements: [nombreCorto], type: sequelize.QueryTypes.SELECT })
          .then(response => {
            if (response.length) {
              return res.status(409).json({
                "mensaje": "El plato que estas intentado crear ya se encuentra registrado. Intenta nuevamente con un plato diferente",
                "plato": {
                  "nombreLargo": nombreLargo,
                  "nombreCorto": nombreCorto,
                  "foto": foto,
                  "precio": precio
                }
              })
            } else {
              return next();
            }
          })
      }
    })
};

module.exports = validarCrearPlato;