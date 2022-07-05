const {Router, response} = require('express');
const {check} = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProductoId, actualizarProducto, eliminarProducto } = require('../controllers/productosController');
const { existeProducto } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

//TODO: todas las productos - publico
router.get('/', obtenerProductos);

//TODO: obtener una productos por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProductoId);

//TODO: Crear productos - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo valido').isMongoId(),
    validarCampos
], crearProducto);

//TODO: Actualizar un registro por id - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], actualizarProducto);

//TODO: Borrar una productos - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], eliminarProducto);

module.exports = router;