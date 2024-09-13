// rutas de usuario / auth
// host + /api/auth

const {Router} = require('express');
const {check} = require('express-validator');

const {crearUsuario,loginUsuario,revalidarToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

const router =Router();

router.post('/new',
    //middlewares
    [
        check('name','EL nombre tiene que ser obligatorio').not().isEmpty(),
        check('email','EL email es obligatorio').isEmail(),
        check('password','la contrase;a tiene que ser mas de 6 caracteres').isLength({min: 6}),
        validarCampos
    ]
    ,crearUsuario);

router.post('/',
     //middlewares
     [
        check('email','EL email es obligatorio').isEmail(),
        check('password','la contrase;a tiene que ser mas de 6 caracteres').isLength({min: 6}),
        validarCampos
    ]

    ,loginUsuario);

router.get('/renew',validarJWT,revalidarToken);

module.exports = router;