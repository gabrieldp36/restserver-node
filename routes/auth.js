const {Router} = require('express');

const {check} = require('express-validator');

const {login, googleSingIn} = require('../controllers')

const {validarCampos} = require('../middleware');

const {validacionEmailAuth} = require('../helpers')

const router = Router();

router.post('/login', [

    check('correo').custom(validacionEmailAuth),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos,

], login);

router.post('/google', [

    check('id_token', 'El Id Token es obligatorio.').notEmpty(),
    validarCampos,

], googleSingIn);

module.exports = router;