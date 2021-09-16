const {response, request} = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const {generacionJWT} = require('../helpers/gerenacion-jwt');

const login = async (req = request, res = response) => {

    const {correo, password} = req.body;

    try{

        // Verificamos si existe un usuario con el correo ingresado.

        const usuario = await Usuario.findOne( {correo} );

        if (!usuario) {

            return res.status(400).json({

                msg: 'El correo / password son incorrectos',
            });
        };

        // Verificamos si el usuario se encuentra activo.

        if(!usuario.estado) {

            return res.status(400).json({

                msg: 'El correo / password son incorrectos',
            }); 
        };

        // Verificamos que la contraseña ingresada sea válida.

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if(!validPassword) {

            return res.status(400).json({

                msg: 'El correo / password son incorrectos',
            }); 
        };

        // Generamos el JWT.

        const token = await generacionJWT(usuario.id)

        res.json({

            usuario,
            token,
        });
    
    } catch (error) {

        console.log(error);

        return res.status(500).json({

            msg: 'Consulte al administrador',
        });
    };
};

module.exports = {

    login,
};