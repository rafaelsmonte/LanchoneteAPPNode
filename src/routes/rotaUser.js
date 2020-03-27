const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController')

router.get('/', controller.get);
router.post('/cadastrar', controller.post);
router.post('/auth', controller.auth);
module.exports = router;