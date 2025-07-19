describe('Testes E2E para o fluxo de Livros', () => {
    it('Deve criar um autor, depois criar um livro associado e verificar a listagem', () => {
        cy.visit('http://localhost:3000/autores/novo');
        
        const nomeAutor = `Cypress Autor ${Date.now()}`;
        cy.get('input[name="nome"]').type(nomeAutor);
        cy.get('button[type="submit"]').click();
        
        cy.url().should('include', '/autores');
        cy.contains(nomeAutor);


        cy.visit('http://localhost:3000/livros/novo');

        const tituloLivro = `Cypress Livro ${Date.now()}`;
        cy.get('input[name="titulo"]').type(tituloLivro);

        cy.get('select[name="autorId"]').select(nomeAutor);
        
        cy.get('button[type="submit"]').click();


        cy.url().should('eq', 'http://localhost:3000/livros');
        
        cy.contains('tr', tituloLivro)
        .should('be.visible')
        .and('contain', nomeAutor);
    });
});