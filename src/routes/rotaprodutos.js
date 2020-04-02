const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtosController');

const authMiddleware = require("../middlewares/auth")

router.use(authMiddleware);

router.get('/', controller.get);
router.post('/Cadastrar', controller.post);
router.get('/:id', controller.getById);
module.exports = router;
