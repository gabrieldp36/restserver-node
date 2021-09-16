const path = require('path');

const express = require('express');

const cors = require('cors');

const {dbConnection} = require('../database/config')

class Server {

    constructor () {

        this.app = express();

        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';

        this.authPath = '/api/auth';

        // Conección a la base de datos.

        this.conectarDB();

        // Middlewares.

        this.middlewares();
        
        // Rutas de mi aplicación.

        this.routes();

        this.listen();

    };

    async conectarDB () {

        await dbConnection();

    };

    middlewares () {

        // Cors.

        this.app.use( cors() );

        // Lectura y parseo del body.

        this.app.use( express.json() );

        // Directorio público.

        this.app.use( express.static ('public') );

    };

    routes () {

        this.app.use( this.authPath, require('../routes/auth') );

        this.app.use( this.usuariosPath, require('../routes/usuarios') );

        this.app.get('*', (req, res) => {
    
            res.status(404).sendFile( path.resolve('./public/404.html') );
           
        });

    };

    listen() {
        
        this.app.listen(this.port, () => {

            console.log(`Servidor corriendo en http://localhost:${this.port}.`);
    
        });
    };
};

module.exports = Server;