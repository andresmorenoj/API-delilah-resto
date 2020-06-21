const express = require('express');
const PORT = 3000;
const api = express();

api.listen(PORT, () => console.log(`Servidor iniciado en el puerto --> ${PORT}`));