const {Router} = require('express');

const {check} = require('express-validator');

const {validarCampos} = require('../middleware/validar-campos');

const {esRolValidoPost, 
    esRolValidoPut, 
    existeEmail, 
    existeUsuarioById,
    passwordPut} = require('../helpers/db-validators');

const router = Router();

const {usuariosGet, 
    usuariosPut, 
    usuariosPost,
    usuariosDelete,
    usuariosPatch} = require('../controllers/usuarios')

router.get('/', usuariosGet);

router.put('/:id', [

    check('id', 'El id ingresado no es válido.').isMongoId(),
    
    check('id').custom(existeUsuarioById),

    check('password').custom(passwordPut),

    check('rol').custom(esRolValidoPut),

    validarCampos,

], usuariosPut);

router.post('/', [

    check('nombre', 'El nombre es obligatorio.').notEmpty(),

    check('apellido', 'El apellido es obligatorio.').notEmpty(),

    check('correo', 'El correo ingresado no es válido.').isEmail(),

    check('correo').custom(existeEmail),

    check('password', 'El password debe contener al menos 8 caracteres.').isLength({min: 8}),

    // check('rol', 'No es un rol permitido.').isIn( ['ADMIN_ROLE', 'USER_ROLE'] ),

    check('rol').custom(esRolValidoPost),

    validarCampos,

], usuariosPost);

router.delete('/:id',[

    check('id', 'El id ingresado no es válido.').isMongoId(),
    
    check('id').custom(existeUsuarioById),

    validarCampos,

], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;