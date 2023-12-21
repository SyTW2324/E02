import 'mocha';
import { expect } from 'chai';
import {testFunction} from '../test_funcionts/basicFunction'

// En un futuro cuando se desarrollen mas funcionalidades se implementaran aqui
describe('Funciones de prueba para el backend', () => {
  it('Prueba de testFunction', () => {
    expect(testFunction()).equal("Esto es una prueba basica")
  });
});
