const {response, request} = require('express');

const jwt = require('jsonwebtoken');

const {Usuario} = require('../models');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {

        return res.status(401).json({

            msg: 'No se ha enviado un token en la petición.'
        });
    };

    try {

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        req.uid = uid;

        // Identificar al usuario que corresponde al uid.

        const usuario = await Usuario.findById(uid);
       
        if (!usuario) {

            return res.status(401).json({

                msg: 'Token inválido.'
            });
        };

        if (!usuario.estado) {

            return res.status(401).json({

                msg: 'Token inválido.'
            });

        };

        req.usuarioAuth = usuario;
        
        next();

    } catch (error) {

        console.log(error);

        res.status(401).json({

            msg: 'Token inválido.'
        });
    };
};

module.exports = {

    validarJWT,
};