const {response, request} = require('express');

const usuariosGet = (req = request, res = response) => {

    const { nombre = 'Sin nombre', apellido = 'Sin Apellido', apikey} = req.query;

    res.json({
        msg: 'get API - usuariosGet',
        nombre,
        apellido,
        apikey
    });
};

const usuariosPut = (req = request, res = response) => {

    const id = req.params.id

    res.json({
        msg: 'put API - usuariosPut',
        id,
    });
};

const usuariosPost = (req = request, res = response) => {

    const {nombre, apellido, trabajo, id } = req.body;

    res.status(201).json({
        msg: 'post API - usuariosPost',
        nombre,
        apellido,
        trabajo,
        id,
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