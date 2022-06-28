const {response, request} = require('express');

const usuriosGet = (req = request, res = response) => {
    const {q, nombre = 'No name', apikey} = req.query;

    res.json({
        msg:'get API - Controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;

    res.json({
        msg:'post API - Controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg:'put API - Controlador',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg:'patch API - Controlador'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg:'delete API - Controlador'
    });
}

module.exports = {
    usuriosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}