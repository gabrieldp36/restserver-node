const {response, request} = require('express');

const esAdminRole = (req = request, res = response, next) => {

    if (!req.usuarioAuth) {

        return res.status(500).json({

            msg: 'Se quiere validar el rol sin antes haberse verificado previamente el token.'
        });
    };

    const {nombre, apellido, rol} = req.usuarioAuth;

    if (rol !== 'ADMIN_ROLE') {

        return res.status(401).json({

            msg: `${nombre} ${apellido} no es administrador.`
        });
    };

    next()

};

const tieneRolRequerido = (...roles) => {

    return (req, res, next) => {

        if (!req.usuarioAuth) {

            return res.status(500).json({
    
                msg: 'Se quiere validar el rol sin antes haberse verificado previamente el token.'
            });
        };


        if ( !roles.includes(req.usuarioAuth.rol) ) {

            return res.status(401).json({

                msg: `La utilización del servicio requiere uno de los siguientes roles: ${roles}.`
            });
        };

        next();
    };
};

module.exports = {

    esAdminRole,
    tieneRolRequerido,
};