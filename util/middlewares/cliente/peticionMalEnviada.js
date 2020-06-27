function peticionMalEviada(req, res, next) {
  const { usuario, nombreApellido, correo, telefono, direccion, contrasenia } = req.body;
  if ((typeof usuario === 'string') && (typeof nombreApellido === 'string') && (typeof correo === 'string') && (typeof telefono === 'string') && (typeof direccion === 'string') && (typeof contrasenia === 'string')) {
    if (usuario.length > 3 && usuario.length <= 20 && nombreApellido.length > 4 && nombreApellido.length <= 30 && correo.length > 6 && correo.length <= 60 && telefono.length > 6 && telefono.length <= 15 && contrasenia.length > 7 && direccion.length > 5 && direccion.length <= 70 && contrasenia.length <= 60) {
      return next()
    } else {
      return res.status(400).json('Petición mal enviada');
    }
  } else {
    return res.status(400).json('Petición mal enviada');
  }
}

module.exports = peticionMalEviada 