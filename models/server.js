const express = require('express');

const cors = require('cors');

class Server {

    constructor () {

        this.app = express();

        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';

        // Middlewares.

        this.middlewares();
        
        // Rutas de mi aplicación.

        this.routes();

        this.listen();

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

        this.app.use( this.usuariosPath, require('../routes/usuarios') );

        this.app.get('*', (req, res) => {
    
            res.status(404).sendFile('C:/Users/gabri/Desktop/Node-Experto/07-restserver/public/404.html');
        
        });

    };

    listen() {
        
        this.app.listen(this.port, () => {

            console.log(`Servidor corriendo en el puerto ${this.port}`);
    
        });
    };
};

module.exports = Server;