const {response, request} = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {

    res.json({
        msg: 'get API - usuariosGet',
       
    });
};

const usuariosPut = (req = request, res = response) => {

    const id = req.params.id

    res.json({
        msg: 'put API - usuariosPut',
        id,
    });
};

const usuariosPost = async (req = request, res = response) => {

    const {nombre, apellido, correo, password, img, rol } = req.body;

    const usuario = new Usuario({nombre, apellido, correo, password, img, rol });

    // Verificar si el correo existe.

    // Encriptar la contraseña.

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB.

    await usuario.save();

    res.status(201).json({
        usuario,
    });
};

const usuariosDelete = (req = request, res = response) => {

    res.json({
        msg: 'delete API - usuariosDelete',
    });
    
};

const usuariosPatch = (req = request, res = response) => {

    res.json({
        msg: 'patch API - usuariosPatch',
    });
    
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
};