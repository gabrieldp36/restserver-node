const {response, request} = require('express');

const {buscarUsuario, 
    buscarCategoria,
    buscarProductos,
    buscarCategoriasProductos} = require('../helpers');

const collecionesPermitidas = [

    'CATEGORIAS',
    'PRODUCTOS',
];

const buscar = (req = request, res = response) => {

    const {coleccion, termino} = req.params;

    if ( !collecionesPermitidas.includes( coleccion.toUpperCase() ) ) {

        return res.status(400).json({

            msg: `Las coleciones permitidas para búsquedas públicas son las siguentes: ${collecionesPermitidas}`,
        });
    };

    switch( coleccion.toUpperCase() ) {

        case 'CATEGORIAS':

            buscarCategoria(termino, res);
        
        break;

        case 'PRODUCTOS':

            buscarProductos(termino, res);
        
        break;

        default:

            res.status(500).json({

                msg: `No se ha impletado un procedimiento de búsqueda para la colección ${coleccion}. Por favor, consulte con el administrador.`
            });
    };
};

const buscarUsuarios = async (req = request, res = response) =>{
    
    const {termino} = req.params;

    buscarUsuario(termino, res);
};

const buscarProductosPorCategoria = async (req = request, res = response) =>{
    
    const {termino} = req.params;

    buscarCategoriasProductos(termino, res);
};

module.exports = {

    buscar,
    buscarUsuarios,
    buscarProductosPorCategoria,
};