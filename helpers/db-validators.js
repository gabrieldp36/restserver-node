const Role = require('../models/role');

const Usuario = require('../models/usuario');

const esRolValidoPost = async (rol = '') => {

    const existeRol = await Role.findOne({rol});

    if (rol.length === 0) {

        throw new Error('El rol es obligatorio.');

    } else if (!existeRol && rol.length > 0) {

        throw new Error(`El rol ${rol} no se encuentra registrado en la base de datos.` );
    };
};

const existeEmail = async (correo = '') => {

    const existeCorreo = await Usuario.findOne( {correo} );

    if (existeCorreo) {

        throw new Error(`El e-mail: ${correo}, ya se encuentra registrado.`);

    };
};

const existeUsuarioById = async (id) => {

    try{

        const existeUsuario = await Usuario.findById(id)

        if (!existeUsuario) {

            throw new Error();
        };

    } catch (error) {

        throw new Error(`El id ${id}, no existe.`);

    };
};

const passwordPost = async ( password = '' ) => {

    validarPassword(password);
};

const esRolValidoPut = async (rol = '') => {

    const existeRol = await Role.findOne( {rol} );

    if (!existeRol && rol.length > 0) {

        throw new Error(`El rol ${rol} no se encuentra registrado en la base de datos.`);

    };
};

const passwordPut = async (password = '') => {

    if (password.length > 0 ) {

        validarPassword(password);
    };  
};

const esEstadoValidoPut = async (estado) => {

    if ( ( !(estado === 'true') || (estado === 'false') ) && !(estado === undefined) && estado.length > 0) { 

        throw new Error('Mediante una petición de tipo PUT, el estado solo puede ser actualizado a true.');

    };
};

const validacionEmailPut = async (correo = '') => {

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const existeCorreo = await Usuario.findOne( {correo} );

    if (existeCorreo) {

        throw new Error(`El e-mail: ${correo}, ya se encuentra registrado.`);

    } else if (!existeCorreo) {
    
        if ( !emailRegex.test(correo) && correo.length > 0) {

            throw new Error('El correo ingresado no es válido.');

        };
    };
};

const validarPassword = ( password = '' ) => {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if ( !passwordRegex.test(password) ) {

        throw new Error('La contraseña debe contener mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula y un número, sin caracteres especiales.');

    };
};

module.exports = {

    esRolValidoPost,
    existeEmail,
    existeUsuarioById,
    passwordPost,
    esRolValidoPut,
    passwordPut,
    esEstadoValidoPut,
    validacionEmailPut,
};