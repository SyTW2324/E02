import 'mocha';
import { expect } from 'chai';

const testFunction = () => {
  return "Esto es una prueba basica";
};

// En un futuro cuando se desarrollen mas funcionalidades se implementaran aqui
describe('Funciones de prueba para el backend', () => {
  it('Prueba de testFunction', () => {
    expect(testFunction()).equal("Esto es una prueba basica")
  });
});
