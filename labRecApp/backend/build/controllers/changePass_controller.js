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
exports.changePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../db/models/user_model"));
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const { oldPass, newPass } = req.body;
        console.log("Servido:\n");
        console.log(email);
        const usuario = yield user_model_1.default.findOne({ email });
        console.log(usuario);
        if (!usuario) {
            res.status(401).json({ error: 'No existe el usuario' });
            return;
        }
        else {
            const validPwd = yield bcrypt_1.default.compare(oldPass, usuario.password);
            if (validPwd) {
                const isPasswordValid = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPass);
                if (!isPasswordValid) {
                    res.status(401).json({ error: "La contraseña ha de tener 8 caracteres, un número y una letra mayuscula al menos." });
                    return;
                }
                else {
                    const newPassword = yield bcrypt_1.default.hash(newPass, 5);
                    usuario.password = newPassword;
                    res.status(201).json({ message: "Se ha modificado la contraseña" });
                }
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al tratar de cambiar la contraseña' });
    }
});
exports.changePassword = changePassword;
