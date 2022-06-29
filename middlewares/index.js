//const { validarJWT } = require('../middlewares/validar-jwt');
const validarJWT = require('../middlewares/validar-jwt');

//const { validarCampos } = require('../middlewares/validar-campos');
const validarCampos = require('../middlewares/validar-campos');

//const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const validarRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validarJWT,
    ...validarCampos,
    ...validarRoles
}