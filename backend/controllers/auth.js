const  response = require('express');
const bcrypt = require('bcryptjs');
const {validationResult, body} = require('express-validator');
const Usuario = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt');

const crearUsuario = async(req , res = response)=>{
    const {email,password} = req.body;
 try {
    let usuario = await Usuario.findOne({email: email});
    if(usuario){
        return res.status(400).json({
            ok:false,
            msg:'Un usuario ya existe con ese correo'
        });
    }  
     usuario = new  Usuario(req.body);

     // encriptar contrasena
     const salt = bcrypt.genSaltSync();
     usuario.password = bcrypt.hashSync(password,salt);
     // guardar datos
    await usuario.save();
    //generar JWT
    const token = await generarJWT(usuario.id,usuario.name);

    res.status(201).json({
        ok:true,
        uid: usuario.id,
        name: usuario.name,
        token
    })
    
 } catch (error) {
    res.status(500).json({
        ok:false,
        msg: 'por favor hable con el administrador'
    })
 }

}

const loginUsuario =  async(req , res = response)=>{

    const {email,password} = req.body;
    try {
        const usuario = await Usuario.findOne({email: email});
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'Email inconrrecto'
            });
        }  

        // validar contrasena
        const validPassword = bcrypt.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'contrasena incorrecta'
            })
        }
        ////generar JwT
        const token = await generarJWT(usuario.id,usuario.name);
        res.json({
            ok:true,
            uid: usuario.id,
            name:usuario.name,
            token
        })

    } catch (error) {

        res.status(500).json({
            ok:false,
            msg: 'por favor hable con el administrador'
        })
        
    }
    
   
}

const revalidarToken = async(req , res = response)=>{
    const{uid, name} = req;
    //generar un nuevo JWT
     //generar JWT
     const token = await generarJWT(uid,name);
    res.json({
        ok:true,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
