const express = require('express');
const router = express.Router();
const LivroController = require('../controllers/LivroController');

router.post('/livros', LivroController.create);
router.get('/livros', LivroController.getAll);
router.get('/livros/:id', LivroController.getById);
router.put('/livros/:id', LivroController.update);
router.delete('/livros/:id', LivroController.delete);

module.exports = router;