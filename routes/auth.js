const {Router} = require('express');

const {check} = require('express-validator');

const {login} = require('../controllers/auth')

const {validarCampos} = require('../middleware/validar-campos');

const {validacionEmailAuth} = require('../helpers/db-validators')

const router = Router();

router.post('/login', [

    check('correo').custom(validacionEmailAuth),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos,

], login);

module.exports = router;