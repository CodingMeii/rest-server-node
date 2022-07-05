const {response, request, json} = require('express');
const {Producto} = require('../models');

//Obtener productos - paginado - total - populate
const obtenerProductos = async (req, res = response) => {
    const {limite = 5, desde = 0} = req.query;

    const [total, productos] = await Promise.all([
        Producto.countDocuments({estado: true}),
        Producto.find({estado: true})
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        productos
    });
}

//Obtener la productos by id
const obtenerProductoId = async (req, res = response) => {
    const {id} = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    res.json(producto);
}

//Crear productos
const crearProducto = async (req = request, res = response) => {
    const {estado, usuario, ...body} = req.body;
    const productoDB = await Producto.findOne({nombre: body.nombre});

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        })
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(), 
        usuario: req.usuario._id
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(200).json(producto);
}

//actualizar productos
const actualizarProducto = async (req, res = response) => {
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

    res.json(producto);
}

//Borrar productos - Estado: false
const eliminarProducto = async (req, res = response) => {
    const {id} = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.json(producto);
}

module.exports = {
    obtenerProductos,
    obtenerProductoId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}