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
const recordSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    estado: { type: String, require: false },
    dateTime: { type: String, require: false },
    ubication: { type: String, require: false },
    action: { type: String, require: false },
    jornada: { type: String, require: false },
    //horasTrabajadas: {type: String, require: false},
    //inicioJornada: {type:String, require: false}
});
// Crear el modelo Usuario
const record = mongoose_1.default.model('record', recordSchema);
// Exportamos el modelo de datos
exports.default = record;
