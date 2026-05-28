// Rotas de login e cadastro.

const express = require('express');
const authController = require('../controllers/AuthController');

const router = express.Router();

// cadastra usuario
router.post('/cadastro', authController.cadastrar);

// faz login
router.post('/login', authController.login);

module.exports = router;
