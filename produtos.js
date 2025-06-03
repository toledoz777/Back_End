const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosControllers');

router.post('/', produtosController.criarProduto);
router.get ('/', produtosController.listaProdutos);
router.put ('/:id', produtosController.atualizarProduto);
router.delete('/:id', produtosController.deletarProduto);

module.exports = router;