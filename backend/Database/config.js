const mongoose = require ('mongoose');

const dbCOnnection = async() =>{
    try {
      await  mongoose.connect(process.env.DB_CNN);
      console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error("Error en la conexion de la base de datos");
    }
}

module.exports ={
    dbCOnnection
}