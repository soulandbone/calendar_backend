/*
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

router.use(validarJWT); //instead of applying the middleware to every route

//Todas tienen que pasar por la validacion del JWT
//Obtener eventos
router.get('/', getEventos);

//Crear un nuevo evento
router.post(
  '/',
  [
    check('title', 'El Titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de Inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos,
  ],
  crearEvento
);

//Actualizar evento
router.put(
  '/:id',
  [
    check('title', 'El Titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de Inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);

//Actualizar evento
router.delete('/:id', eliminarEvento);

module.exports = router;
