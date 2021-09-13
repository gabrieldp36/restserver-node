const Role = require('../models/role');

const Usuario = require('../models/usuario');

const esRolValidoPost = async (rol = '') => {

    const existeRol = await Role.findOne({rol});

    if (rol.length === 0) {

        throw new Error(`El rol es obligatorio.`);

    } else if (!existeRol && rol.length > 0) {

        throw new Error(`El rol ${rol} no se encuentra registrado en la base de datos.` );
    };
};

const esRolValidoPut = async (rol = '') => {

    const existeRol = await Role.findOne({rol});

    if (!existeRol && rol.length > 0) {

        throw new Error(`El rol ${rol} no se encuentra registrado en la base de datos.` );

    };
};

const existeEmail = async (correo = '') => {

    const existeCorreo = await Usuario.findOne({correo});

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

const passwordPut = async (password = '') => {

    if (password.length > 0 && password.length < 8) {

        throw new Error('El password debe contener al menos 8 caracteres.');
    };
};

module.exports = {

    esRolValidoPost,
    esRolValidoPut,
    existeEmail,
    existeUsuarioById,
    passwordPut,
};