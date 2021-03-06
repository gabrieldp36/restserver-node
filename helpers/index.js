const busquedasMetodos = require('./busquedas-metodos');

const dbValidatorsCategorias = require('./db-validators-categorias');

const dbValidatorsProductos = require('./db-validators-productos');

const dbValidatorsUploads = require('./db-validators-uploads');

const dbValidatorsUsuarios = require('./db-validators');

const generacionJWT = require('../helpers/gerenacion-jwt');

const googleVerify = require('../helpers/google-verify');

const subirArchivo = require('../helpers/subir-archivo');

module.exports = {
    
    ...busquedasMetodos,
    ...dbValidatorsCategorias,
    ...dbValidatorsProductos,
    ...dbValidatorsUploads,
    ...dbValidatorsUsuarios,
    ...generacionJWT,
    ...googleVerify,
    ...subirArchivo,
};

