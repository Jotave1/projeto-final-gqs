// tests/integration/livros.test.js
const request = require('supertest');
const sequelize = require('../../src/database');
const app = require('../../src/app'); // Importa a aplicação real
const Autor = require('../../src/models/Autor');

let autorTeste;

beforeEach(async () => {
  await sequelize.sync({ force: true });
  autorTeste = await Autor.create({ nome: 'J. K. Rowling' });
});

describe('Testes de Integração para a API de Livros', () => {

  test('POST /api/livros - Deve criar um livro com autorId válido', async () => {
    const novoLivro = {
      titulo: 'Harry Potter',
      ano_publicacao: 1997,
      autorId: autorTeste.id,
    };
    const response = await request(app).post('/api/livros').send(novoLivro);
    expect(response.statusCode).toBe(201);
    expect(response.body.titulo).toBe('Harry Potter');
  });

  test('POST /api/livros - Não deve criar um livro com autorId inválido', async () => {
    const novoLivro = { titulo: 'Livro Fantasma', autorId: 999 };
    const response = await request(app).post('/api/livros').send(novoLivro);
    expect(response.statusCode).toBe(404);
  });
  
  test('GET /api/livros/:id - Deve retornar um livro específico', async () => {
    const livroCriado = await request(app).post('/api/livros').send({
      titulo: 'A Câmara Secreta',
      autorId: autorTeste.id
    });
    const livroId = livroCriado.body.id;

    const response = await request(app).get(`/api/livros/${livroId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.autor.nome).toBe('J. K. Rowling');
  });
});

afterAll(async () => {
  await sequelize.close();
});