# Projeto Final: Gestão da Qualidade de Software 💻

E aí! Este é o projeto final da matéria de Gestão da Qualidade de Software

A ideia foi construir um app web do zero para cadastrar livros e autores. Mas o mais importante não era só fazer funcionar, e sim **garantir a qualidade** do código com uma bateria de testes completa, usando o que a gente aprendeu na disciplina.

## 🛠️ Tecnologias Usadas

- **Backend:** Node.js com Express.js
- **Banco de Dados:** SQLite e o ORM Sequelize pra conversar com ele
- **Frontend:** EJS pra renderizar o HTML das páginas
- **Testes de API:** Jest + Supertest
- **Testes de Interface (E2E):** Cypress
- **Ambiente Dev:** Nodemon pra não precisar reiniciar o servidor a cada alteração

## ✨ O que o projeto faz?

- Uma **API RESTful completinha** com todas as operações (CRUD) para Autores e Livros.
- Uma **interface web simples** pra listar e cadastrar autores e livros pelo navegador.
- **Testes de Integração** que validam cada rota da API, tanto os casos de sucesso quanto os de erro.
- **Testes E2E (ponta-a-ponta)** que abrem o navegador e simulam um usuário de verdade usando o sistema.

## ⚙️ Como rodar na sua máquina (Setup)

Pra rodar o projeto localmente, é só seguir esses passos no seu terminal:

1.  **Clone o repo:**
    ```bash
    git clone https://github.com/Jotave1/projeto-final-gqs
    ```

2.  **Entre na pasta do projeto:**
    ```bash
    cd projeto-final-gqs
    ```

3.  **Instale as dependências (baixa as ferramentas):**
    ```bash
    npm install
    ```

## ⚡ Rodando a Aplicação e os Testes

Com tudo instalado, aqui estão os comandos principais:

### Ligando o servidor

Pra iniciar a aplicação em modo de desenvolvimento:
```bash
npm run dev
```

Depois disso, é só abrir o navegador em http://localhost:3000.

# Rodando os testes

Lembrete: Pra rodar os testes do Cypress, o servidor (npm run dev) precisa estar rodando em outro terminal!

## Testes da API (Jest):

```Bash
npm run test:integration
```

## Testes de Interface (Cypress):

```Bash
npm run test:e2e
```
Esse comando abre a janela do Cypress pra você escolher e rodar os testes de navegador.

# Mapa da API

A API fica no prefixo /api. Aqui estão os endpoints:

Autores
| Método | Rota | Descrição |
|:---|:---:|:---|
|GET | /api/autores | Lista todos os autores
|GET | /api/autores/:id | Pega um autor por ID
|POST | /api/autores | Cria um novo autor
|PUT | /api/autores/:id | Atualiza um autor
|DELETE |/api/autores/:id | Deleta um autor


Livros
| Método	Rota	Descrição |
|:---|:---:|:---|
| GET | /api/livros | Lista todos os livros
| GET | /api/livros/:id | Pega um livro por ID
| POST | /api/livros | Cria um novo livro
| PUT | /api/livros/:id | Atualiza um livro
| DELETE | /api/livros/:id | Deleta um livro

Feito por
Nome: João Victor da Silva Oliveira

Curso: Análise e Desenvolvimento de Sistemas
