const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETKEY);
        const usuario = await Usuario.findById(uid);
        req.usuario = usuario;
        req.uid = uid;

        //Verificar si el uid tiene estado en true

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe en bd'
            })
        }

        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - Usuario con estado false'
            }) 
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

    //console.log(token);
    //next();
}

module.exports = {
    validarJWT
}