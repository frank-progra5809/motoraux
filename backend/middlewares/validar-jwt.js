const {reponse} =require('express');
const jwt = require('jsonwebtoken');
const validarJWT = (req, res= reponse, next) => {
// x-token headers
const token = req.header('x-token')
if (!token) {
    return res.status(401).json({
        ok: false,
        msg: 'No existe token para la peticion'
    });
}
try {

    const {uid,name} = jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
    );
    req.uid = uid;
    req.name = name;
    //console.log(payload);

    
} catch (error) {
    return res.status(401).json({
        ok:false,
        msg: 'token no valido'
    });
}
next();

}

module.exports = {
    validarJWT
}