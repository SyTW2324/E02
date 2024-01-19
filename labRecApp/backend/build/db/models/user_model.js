"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Definimos el esquema para el modelo de Usuario
const userSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    surnames: { type: String, require: true },
    dni: { type: String, require: true },
    phone: { type: Number },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    administrator: { type: Number, require: true },
    afiliateNumber: { type: Number, require: true },
    vacationsDays: { type: Number, require: false }
});
// Crear el modelo Usuario
const user = mongoose_1.default.model('user', userSchema);
// Exportamos el modelo de datos
exports.default = user;