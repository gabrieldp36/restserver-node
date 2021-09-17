const {response, request} = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    let {limite = 5, desde = 0} = req.query;

    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( (isNaN(desde) ) ? desde = 0 : Number(desde) )
            .limit( (isNaN(limite) ) ? limite = 5 : Number(limite) ),
        
    ]);

    res.json({

        total,
        usuarios,
    });
};

const usuariosPut = async (req = request, res = response) => {

    const id = req.params.id;

    const {_id, google, password, correo, rol, estado, ...restoArgumentos} = req.body;

    if (password && password.length > 0) {

        // Encriptamos el nuevo password del usuario.

        const salt = bcryptjs.genSaltSync();

        restoArgumentos.password = bcryptjs.hashSync(password, salt);
    };

    if (correo) {

        restoArgumentos.correo = correo;
    };

    if (rol) {

        restoArgumentos.rol = rol;
    };

    if (estado) {

        restoArgumentos.estado = estado;
    };

    const usuario = await Usuario.findByIdAndUpdate( id, restoArgumentos, {new: true} );

    res.json(usuario,);
};

const usuariosPost = async (req = request, res = response) => {

    const {nombre, apellido, correo, password, img, rol } = req.body;

    const usuario = new Usuario( {nombre, apellido, correo, password, img, rol } );

    // Encriptar la contraseña.

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB.

    await usuario.save();

    res.status(201).json(usuario);
};

const usuariosDelete = async (req = request, res = response) => {

    const id = req.params.id;

    // Eliminación física de la Base de Datos.

    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );

    const usuarioAutenticado = req.usuarioAuth;

    res.json(usuario);
    
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
};