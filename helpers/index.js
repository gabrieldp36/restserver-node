const busquedasMetodos = require('./busquedas-metodos');

const dbValidatorsCategorias = require('./db-validators-categorias');

const dbValidatorsProductos = require('./db-validators-productos');

const dbValidatorsUsuarios = require('./db-validators');

const generacionJWT = require('../helpers/gerenacion-jwt');

const googleVerify = require('../helpers/google-verify');

module.exports = {
    
    ...busquedasMetodos,
    ...dbValidatorsCategorias,
    ...dbValidatorsProductos,
    ...dbValidatorsUsuarios,
    ...generacionJWT,
    ...googleVerify
};

