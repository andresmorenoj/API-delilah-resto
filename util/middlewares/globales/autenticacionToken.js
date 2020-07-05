const { firmaSegura } = require('../../routes/rutasCliente');
const jwt = require('jsonwebtoken');

function autenticacionToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const verificarToken = jwt.verify(token, firmaSegura);
    if (verificarToken) {
      req.usuario = verificarToken;
      return next();
    }
  } catch (error) {
    return res.status(400).json({ error: "acceso denegado - Intenta de nuevo." });
  }
}

module.exports = autenticacionToken;