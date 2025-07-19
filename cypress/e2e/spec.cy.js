describe('Testes E2E para o fluxo de Autores', () => {
  it('Deve cadastrar um novo autor e depois encontrá-lo na lista', () => {
    cy.visit('http://localhost:3000/autores');

    cy.get('a.btn[href="/autores/novo"]').click();

    cy.url().should('include', '/autores/novo');

    const nomeAutor = `Autor Teste ${Date.now()}`;

    cy.get('input[name="nome"]').type(nomeAutor);

    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:3000/autores');

    cy.contains(nomeAutor).should('be.visible');
  });
});