const Livro = require('../models/Livro');
const Autor = require('../models/Autor');

module.exports = {
    async renderLista(req, res) {
        try {
        const livros = await Livro.findAll({
            include: { model: Autor, as: 'autor', attributes: ['nome'] }
        });
        res.render('livros/index', { livros: livros });
        } catch (error) {
        res.status(500).send('Erro ao carregar a lista de livros.');
        }
    },

    async renderNovoForm(req, res) {
        try {
        const autores = await Autor.findAll();
        res.render('livros/novo', { autores: autores });
        } catch (error) {
        res.status(500).send('Erro ao carregar o formulário.');
        }
    },

    async createFromWeb(req, res) {
        try {
        const { titulo, ano_publicacao, autorId } = req.body;
        await Livro.create({ titulo, ano_publicacao, autorId });
        res.redirect('/livros');
        } catch (error) {
        res.status(500).send('Erro ao criar o livro.');
        }
    },

    async create(req, res) {
        try {
        const { titulo, ano_publicacao, autorId } = req.body;
        const autor = await Autor.findByPk(autorId);
        if (!autor) return res.status(404).json({ error: 'Autor não encontrado' });
        const livro = await Livro.create({ titulo, ano_publicacao, autorId });
        return res.status(201).json(livro);
        } catch (error) {
        return res.status(400).json({ error: 'Erro ao criar livro', details: error.message });
        }
    },

    async getAll(req, res) {
        try {
        const livros = await Livro.findAll({
            include: { model: Autor, as: 'autor', attributes: ['nome'] }
        });
        return res.status(200).json(livros);
        } catch (error) {
        return res.status(400).json({ error: 'Erro ao listar livros', details: error.message });
        }
    },

    async getById(req, res) {
        try {
        const { id } = req.params;
        const livro = await Livro.findByPk(id, {
            include: { model: Autor, as: 'autor', attributes: ['nome'] }
        });
        if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
        return res.status(200).json(livro);
        } catch (error) {
        return res.status(400).json({ error: 'Erro ao buscar livro', details: error.message });
        }
    },

    async update(req, res) {
        try {
        const { id } = req.params;
        const { titulo, ano_publicacao, autorId } = req.body;
        if (autorId) {
            const autor = await Autor.findByPk(autorId);
            if (!autor) return res.status(404).json({ error: 'Autor não encontrado' });
        }
        const livro = await Livro.findByPk(id);
        if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
        await livro.update({ titulo, ano_publicacao, autorId });
        return res.status(200).json(livro);
        } catch (error) {
        return res.status(400).json({ error: 'Erro ao atualizar livro', details: error.message });
        }
    },

    async delete(req, res) {
        try {
        const { id } = req.params;
        const livro = await Livro.findByPk(id);
        if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
        await livro.destroy();
        return res.status(204).send();
        } catch (error) {
        return res.status(400).json({ error: 'Erro ao deletar livro', details: error.message });
        }
    }
};