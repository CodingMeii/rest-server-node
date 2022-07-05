const {Router, response} = require('express');
const {check} = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoriaId, actualizarCategoria, eliminarCategoria } = require('../controllers/categoriasController');
const { existeCategoria } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const router = Router();

//{{url}}/api/categorias

//TODO: todas las categorias - publico
router.get('/', obtenerCategorias);

//TODO: obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoriaId);

//TODO: Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//TODO: Actualizar un registro por id - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], actualizarCategoria);

//TODO: Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], eliminarCategoria);

module.exports = router;