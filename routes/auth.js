/*
      Users Routes / Auth

      host+ /api/auth

*/

const express = require('express');
const { check } = require('express-validator');

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();

router.post(
  '/new',
  [
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el e-mail es obligatorio').isEmail(),
    check('password', 'el password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  '/',
  [check('email', 'el e-mail es obligatorio').isEmail(), check('password', 'el password debe de ser de 6 caracteres').isLength({ min: 6 }), validarCampos],
  loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
