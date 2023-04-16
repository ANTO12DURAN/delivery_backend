const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');


/*
* RUTAS
*/
const users = require('./routes/usersRoutes');


const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.disable('x-powered-by');
app.set('port', port);

/*
* LLAMANDO A LAS RUTAS 
*/

users(app);



//para ver la ip en la terminal tipea ipconfig y es la IPv4

server.listen(3000, '192.168.1.70' || 'localhost', function(){
    console.log('Aplicacion de NodeJS ' + process.pid + ' Iniciada... ')
    console.log('Aplicacion de NodeJS ' + port + ' Iniciada... ')
});
/*
app.get('/', (req, res) => {
    res.send('Flutter Ruta raiz del backend');
});

app.get('/test', (req, res) => {
    res.send('Este es la ruta test');
});
*/

//ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}

//200 - respuesta exitosa
//404 - url no existe 
//500 - error interno del servidor 