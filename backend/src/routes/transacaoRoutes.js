const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const transacaoController = require('../controllers/TransacaoController');

const router = express.Router();

router.use(authMiddleware);

router.get('/', transacaoController.listar);
router.get('/resumo', transacaoController.resumo);
router.post('/', transacaoController.criar);
router.put('/:id', transacaoController.atualizar);
router.delete('/:id', transacaoController.remover);

module.exports = router;
