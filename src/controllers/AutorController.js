// src/controllers/AutorController.js
const Autor = require('../models/Autor');

module.exports = {
    async renderLista(req, res) {
        try {
        const autores = await Autor.findAll();
        res.render('autores/index', { autores: autores });
        } catch (error) {
        res.status(500).send('Erro ao carregar a lista de autores.');
        }
    },

    renderNovoForm(req, res) {
        res.render('autores/novo');
    },

    async createFromWeb(req, res) {
        try {
        const { nome } = req.body;
        await Autor.create({ nome });
        res.redirect('/autores');
        } catch (error) {
        res.status(500).send('Erro ao criar o autor.');
        }
    },
    
    async create(req, res) {
        try {
        const { nome } = req.body;
        const autor = await Autor.create({ nome });
        return res.status(201).json(autor);
        } catch (error) {
        return res.status(400).json({ error: 'Erro ao criar autor', details: error.message });
        }
    },

    async getAll(req, res) {
        try {
        const autores = await Autor.findAll();
        return res.status(200).json(autores);
        } catch (error) {
        return res.status(400).json({ error: 'Erro ao listar autores', details: error.message });
        }
    },

    async getById(req, res) {
        try {
        const { id } = req.params;
        const autor = await Autor.findByPk(id);
        if (!autor) {
            return res.status(404).json({ error: 'Autor não encontrado' });
        }
        return res.status(200).json(autor);
        } catch (error) {
        return res.status(400).json({ error: 'Erro ao buscar autor', details: error.message });
        }
    },

    async update(req, res) {
        try {
        const { id } = req.params;
        const { nome } = req.body;
        const autor = await Autor.findByPk(id);
        if (!autor) {
            return res.status(404).json({ error: 'Autor não encontrado' });
        }
        await autor.update({ nome });
        return res.status(200).json(autor);
        } catch (error) {
        return res.status(400).json({ error: 'Erro ao atualizar autor', details: error.message });
        }
    },

    async delete(req, res) {
        try {
        const { id } = req.params;
        const autor = await Autor.findByPk(id);
        if (!autor) {
            return res.status(404).json({ error: 'Autor não encontrado' });
        }
        await autor.destroy();
        return res.status(204).send();
        } catch (error) {
        return res.status(400).json({ error: 'Erro ao deletar autor', details: error.message });
        }
    }
};