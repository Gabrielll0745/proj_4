// Rotas de transacoes.

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const transacaoController = require('../controllers/TransacaoController');

const router = express.Router();

// todas as rotas abaixo precisam de token
router.use(authMiddleware);

// listar
router.get('/', transacaoController.listar);

// resumo financeiro
router.get('/resumo', transacaoController.resumo);

// cadastrar
router.post('/', transacaoController.criar);

// editar
router.put('/:id', transacaoController.atualizar);

// excluir
router.delete('/:id', transacaoController.remover);

module.exports = router;
