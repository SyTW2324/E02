describe('template spec', () => {
  context('Elementos del Arbol DOM', () => {
    it('Pruebas las etiquetas del componente', () => {
      cy.visit('http://localhost:5173/login');

      cy.get('input[type="text"]').should('exist');
      cy.get('input[type="password"]').should('exist');
      cy.get('button').should('exist');
      cy.get('img').should('exist');

    })  
  })
})