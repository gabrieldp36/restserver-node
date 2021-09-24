const {Router} = require('express');

const {buscar, 
    buscarUsuarios, 
    buscarProductosPorCategoria} = require('../controllers');

const {validarJWT, 
    esAdminRole,} = require('../middleware');

const router = Router();

router.get('/usuarios/:termino', [
    
    validarJWT, 

    esAdminRole, 

], buscarUsuarios);

router.get('/categorias/productos/:termino', buscarProductosPorCategoria);

router.get('/:coleccion/:termino', buscar);

module.exports = router;