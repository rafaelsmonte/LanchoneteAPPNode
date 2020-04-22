const express = require('express');
const router = express.Router();
const controller = require('../controllers/mesaController');


router.get('/', controller.get);
router.post('/', controller.post);
router.get('/MesasEmAberto', controller.mesasAbertas);
router.put('/adicionarPedido', controller.adicionarPedido);

module.exports = router;