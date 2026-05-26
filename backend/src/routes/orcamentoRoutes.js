const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const orcamentoController = require('../controllers/OrcamentoController');

const router = express.Router();

router.use(authMiddleware);

router.get('/', orcamentoController.listar);
router.post('/', orcamentoController.criar);
router.put('/:id', orcamentoController.atualizar);
router.delete('/:id', orcamentoController.remover);

module.exports = router;
