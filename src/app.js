// src/app.js
const express = require('express');
const path = require('path');
const sequelize = require('./database');

// Importa os models
require('./models/Autor');
require('./models/Livro');

// Importa as rotas
const autorApiRoutes = require('./routes/autorRoutes');
const livroApiRoutes = require('./routes/livroRoutes');
const webRoutes = require('./routes/webRoutes');

const app = express();
const port = 3000;

// Configuração e Middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', autorApiRoutes);
app.use('/api', livroApiRoutes);
app.use('/', webRoutes);
app.get('/', (req, res) => {
  res.redirect('/autores');
});

// Função para iniciar o servidor
async function startServer() {
  try {
    await sequelize.sync();
    console.log('✅ Tabelas sincronizadas com o banco de dados.');
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Erro ao sincronizar as tabelas:', error);
  }
}

// Inicia o servidor apenas se este arquivo for executado diretamente
if (require.main === module) {
  startServer();
}

// Exporta o app para ser usado nos testes
module.exports = app;