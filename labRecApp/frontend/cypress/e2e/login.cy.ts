import { defineStore, createPinia } from 'pinia';
describe('Login spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  }); 

  context('Elementos del Arbol DOM', () => {
    it('Pruebas las etiquetas del componente', () => {

      cy.get('input[type="text"]').should('exist');
      cy.get('input[type="password"]').should('exist');
      cy.get('button').should('exist');
      cy.get('img').should('exist');

    })  
  })
  context('Prueba exitosa de login', () => {
    it('Debería loguearse y redirigirse a la pagina principal', () => {

      // Ingresa credenciales de usuario registrado en la base de datos
      cy.get('input[type="text"]').type('adrian@labrecordapp.es');
      cy.get('input[type="password"]').type('12345');

      // Pulsamos el botón
      cy.get('button').click();
      
      // Si se inicia sesión deberia redirigirnos a la pagina principal de la aplicacion
      cy.url().should('eq', 'http://localhost:5173/mainPage');
    })
  })
})