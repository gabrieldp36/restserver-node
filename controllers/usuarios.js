const {response, request} = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    let {limite = 5, desde = 0} = req.query;

    const usuarios = await Usuario.find()
        .skip( (isNaN(desde) ) ? desde = 0 : Number(desde) )
        .limit( (isNaN(limite) ) ? limite = 5 : Number(limite) );

    res.json({
        
       usuarios
    });
};

const usuariosPut = async (req = request, res = response) => {

    const id = req.params.id;

    const {_id, password, google, correo, rol, ...restoArgumentos} = req.body;

    if (password && password.length > 0) {

        // Encriptamos el nuevo password del usuario.

        const salt = bcryptjs.genSaltSync();

        restoArgumentos.password = bcryptjs.hashSync(password, salt);

    };

    if (rol) {

        restoArgumentos.rol = rol;
    };

    const usuario = await Usuario.findByIdAndUpdate( id, restoArgumentos, {new: true} );

    res.json(usuario,);
};

const usuariosPost = async (req = request, res = response) => {

    const {nombre, apellido, correo, password, img, rol } = req.body;

    const usuario = new Usuario({nombre, apellido, correo, password, img, rol });

    // Encriptar la contraseña.

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB.

    await usuario.save();

    res.status(201).json(usuario);
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