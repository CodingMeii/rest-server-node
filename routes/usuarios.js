const {Router} = require('express');
const {check} = require('express-validator');
const { usuriosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuariosController');
const { esRolValido, emailExiste, existeUsarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuriosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(id => existeUsarioPorId(id)),
    check('rol').custom(rol => esRolValido(rol)),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({min: 6}),
    //check('correo', 'El correo no es valido').isEmail(),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo').custom(email => emailExiste(email)),
    check('rol').custom(rol => esRolValido(rol)),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(id => existeUsarioPorId(id)),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;