"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const basicFunction_1 = require("../test_funcionts/basicFunction");
// En un futuro cuando se desarrollen mas funcionalidades se implementaran aqui
describe('Funciones de prueba para el backend', () => {
    it('Prueba de testFunction', () => {
        (0, chai_1.expect)((0, basicFunction_1.testFunction)()).equal("Esto es una prueba basica");
    });
});
