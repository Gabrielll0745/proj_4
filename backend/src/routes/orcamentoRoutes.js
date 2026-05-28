// Rotas de orcamentos.

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const orcamentoController = require('../controllers/OrcamentoController');

const router = express.Router();

// todas as rotas abaixo precisam de token
router.use(authMiddleware);

// listar
router.get('/', orcamentoController.listar);

// cadastrar
router.post('/', orcamentoController.criar);

// editar
router.put('/:id', orcamentoController.atualizar);

// excluir
router.delete('/:id', orcamentoController.remover);

module.exports = router;
