const {Router} = require('express');

const router = Router();

const {usuariosGet, 
    usuariosPut, 
    usuariosPost,
    usuariosDelete,
    usuariosPatch} = require('../controllers/usuarios')

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;