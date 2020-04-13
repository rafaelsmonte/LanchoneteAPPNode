const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');


router.get('/', controller.get);
router.post('/', controller.post);
router.post('/auth', controller.auth);
router.put('/', controller.put);
router.post('/resetasenha', controller.enviaEmailConfirmacao);
router.post('/validacodigoresetsenha', controller.verificaCodigoResetSenha);

module.exports = router;