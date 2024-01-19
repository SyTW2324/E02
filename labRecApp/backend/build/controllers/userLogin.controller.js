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
exports.userLoginValidator = void 0;
const user_model_1 = __importDefault(require("../db/models/user_model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_int_1 = require("../interfaces/token_int");
const userLoginValidator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const usuario = yield user_model_1.default.findOne({ email });
        if (!usuario) {
            res.status(401).json({ error: 'Credenciales invalidas' });
            return;
        }
        else {
            const validPwd = yield bcrypt_1.default.compare(password, usuario.password);
            if (!validPwd) {
                res.status(401).json({ error: 'Credenciales invalidas' });
                return;
            }
        }
        const _payload = {
            userId: usuario === null || usuario === void 0 ? void 0 : usuario._id,
            role: 'administrator'
        };
        const tokenOptions = {
            expiresIn: '1h'
        };
        // Generamos una token de autentificacion con la librerisa jsonwebtoken
        const userToken = jsonwebtoken_1.default.sign(_payload, token_int_1.secretKey, tokenOptions);
        const responseData = {
            token: userToken,
            name: usuario === null || usuario === void 0 ? void 0 : usuario.name,
            surnames: usuario === null || usuario === void 0 ? void 0 : usuario.surnames,
            dni: usuario === null || usuario === void 0 ? void 0 : usuario.dni,
            phone: usuario === null || usuario === void 0 ? void 0 : usuario.phone,
            email: usuario === null || usuario === void 0 ? void 0 : usuario.email,
            password: usuario === null || usuario === void 0 ? void 0 : usuario.password,
            administrator: usuario === null || usuario === void 0 ? void 0 : usuario.administrator,
            afiliateNumber: usuario === null || usuario === void 0 ? void 0 : usuario.afiliateNumber,
            vacationsDays: usuario === null || usuario === void 0 ? void 0 : usuario.vacationsDays
        };
        res.status(200).json({ responseData });
    }
    catch (error) {
        res.status(200).json({ error: 'No existen registros para los credenciales introducidos' });
    }
});
exports.userLoginValidator = userLoginValidator;
