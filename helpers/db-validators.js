const Role = require("../models/role");
const {Usuario, Categoria, Producto} = require("../models");

const esRolValido = async (rol = "") => {
    const existeRol = await Role.findOne({rol});

    if (!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en BD.`);
    }
}

const emailExiste = async (correo = "") => {
    const existeEmail = await Usuario.findOne({correo});

    if (existeEmail){
        throw new Error(`El correo ${correo} ya esta registrado.`);
    }
}

const existeUsarioPorId = async (id = "") => {
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario){
        throw new Error(`El usuario con id ${id} no existe.`);
    }
}

const existeCategoria = async (id = "") => {
    const existeCategoria = await Categoria.findById(id);

    if (!existeCategoria){
        throw new Error(`La categoria con id ${id} no existe.`);
    }
}

const existeProducto = async (id = "") => {
    const existeProducto = await Producto.findById(id);

    if (!existeProducto){
        throw new Error(`El producto con id ${id} no existe.`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsarioPorId,
    existeCategoria,
    existeProducto
}