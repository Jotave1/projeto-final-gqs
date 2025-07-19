// tests/integration/autores.test.js
const request = require('supertest');
const sequelize = require('../../src/database');
const app = require('../../src/app'); // Importa a aplicação real

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

describe('Testes de Integração para a API de Autores', () => {

  test('GET /api/autores - Deve retornar uma lista vazia', async () => {
    const response = await request(app).get('/api/autores');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /api/autores - Deve criar um novo autor', async () => {
    const novoAutor = { nome: 'Machado de Assis' };
    const response = await request(app).post('/api/autores').send(novoAutor);
    expect(response.statusCode).toBe(201);
    expect(response.body.nome).toBe('Machado de Assis');
  });

  // ... (os outros testes de autores permanecem os mesmos) ...
  test('GET /api/autores/:id - Deve retornar um autor específico', async () => {
    const autorCriado = await request(app).post('/api/autores').send({ nome: 'Clarice Lispector' });
    const autorId = autorCriado.body.id;
    const response = await request(app).get(`/api/autores/${autorId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.nome).toBe('Clarice Lispector');
  });

  test('PUT /api/autores/:id - Deve atualizar um autor', async () => {
    const autorCriado = await request(app).post('/api/autores').send({ nome: 'Graciliano' });
    const autorId = autorCriado.body.id;
    const response = await request(app).put(`/api/autores/${autorId}`).send({ nome: 'Graciliano Ramos' });
    expect(response.statusCode).toBe(200);
    expect(response.body.nome).toBe('Graciliano Ramos');
  });

  test('DELETE /api/autores/:id - Deve deletar um autor', async () => {
    const autorCriado = await request(app).post('/api/autores').send({ nome: 'Autor a ser deletado' });
    const autorId = autorCriado.body.id;
    const deleteResponse = await request(app).delete(`/api/autores/${autorId}`);
    expect(deleteResponse.statusCode).toBe(204);
    const getResponse = await request(app).get(`/api/autores/${autorId}`);
    expect(getResponse.statusCode).toBe(404);
  });

  test('GET /api/autores/:id - Deve retornar 404 para um ID inexistente', async () => {
    const response = await request(app).get('/api/autores/999');
    expect(response.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await sequelize.close();
});