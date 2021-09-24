const authControllers = require('../controllers/auth');

const busquedasControllers = require('../controllers/busquedas');

const categoriasControllers = require('../controllers/categorias');

const productosControllers = require('../controllers/productos');

const usuariosControllers = require('../controllers/usuarios');

module.exports = {
    
    ...authControllers,
    ...busquedasControllers,
    ...categoriasControllers,
    ...productosControllers,
    ...usuariosControllers,
};