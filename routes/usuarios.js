const {Router} = require('express');
const { usuriosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuariosController');

const router = Router();

router.get('/', usuriosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;