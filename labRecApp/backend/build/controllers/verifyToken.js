"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerDatosDelUsuario = void 0;
const user_model_1 = __importDefault(require("../db/models/user_model"));
function obtenerDatosDelUsuario(decoded) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield user_model_1.default.findById(decoded.userId);
            return {
                name: usuario === null || usuario === void 0 ? void 0 : usuario.name,
                surnames: usuario === null || usuario === void 0 ? void 0 : usuario.surnames,
                email: usuario === null || usuario === void 0 ? void 0 : usuario.email,
                dni: usuario === null || usuario === void 0 ? void 0 : usuario.dni,
                phone: usuario === null || usuario === void 0 ? void 0 : usuario.phone,
                administrator: usuario === null || usuario === void 0 ? void 0 : usuario.administrator,
                afiliateNumber: usuario === null || usuario === void 0 ? void 0 : usuario.afiliateNumber,
                vacationsDays: usuario === null || usuario === void 0 ? void 0 : usuario.vacationsDays
            };
        }
        catch (error) {
            // Maneja el error, por ejemplo, loguéalo y devuelve null o un objeto vacío
            console.error('Error al obtener los datos del usuario:', error);
            return null;
        }
    });
}
exports.obtenerDatosDelUsuario = obtenerDatosDelUsuario;
