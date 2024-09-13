// configuracion basica de express
const express = require('express');
require('dotenv').config();
const {dbCOnnection} = require('./Database/config'); 
console.log(process.env);

// crear el server de express
const app = express();

// base de datos 
dbCOnnection();

//directorio publico
app.use(express.static('public'));
//lectura y parseo del body
app.use(express.json());

//rutas 
//TODO: auth / crear/ login/ renew
app.use('/api/auth',require('./routes/auth'));

//TODO: CRUD: Eventos


// escuchar peticion
app.listen(process.env.PORT,()=>{
    console.log('servidor en ejecucion ${ process.env.PORT }');
}
)