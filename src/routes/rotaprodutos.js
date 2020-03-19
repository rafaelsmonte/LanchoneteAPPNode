const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtosController')

router.get('/', controller.get);
router.post('/', controller.post);
module.exports = router;
