const express = require('express');
const router = express.Router();
const AutorController = require('../controllers/AutorController');

router.post('/autores', AutorController.create);
router.get('/autores', AutorController.getAll);
router.get('/autores/:id', AutorController.getById);
router.put('/autores/:id', AutorController.update);
router.delete('/autores/:id', AutorController.delete);

module.exports = router;