describe('Test Login page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:4300');
    cy.url().should('include', '/auth');

    cy.get('.enter-login').type('Nikita_Glukhi');
    cy.get('.enter-login').should('have.value', 'Nikita_Glukhi');

    cy.get('.enter-password').type('test12345@');
    cy.get('.enter-password').should('have.value', 'test12345@');

    cy.get('.btn-info').click();
    cy.url().should('include', '/');
  });
})
