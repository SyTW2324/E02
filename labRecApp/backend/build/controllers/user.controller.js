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
exports.getUsers = exports.findUserByEmail = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../db/models/user_model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//?Creamos un controlador para crear usuarios en la BBDD
//?Este controlador es solamente para yo crear los usuarios con peticiones HTTPS
//?Desde la app no se va a poder acceder a el.
// Un controlador es una función o conjunto de funciones que facilitan la tarea
// de realizar operaciones SCRUM.
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, surnames, dni, phone, email, password, administrator, afiliateNumber, vacationsDays } = req.body;
        const newUser = new user_model_1.default({ name, surnames, dni, phone, email, password, administrator, afiliateNumber, vacationsDays });
        newUser.password = yield bcrypt_1.default.hash(password, 5); // 5 representa el numero de rondas de hashing que bcrypt.
        yield newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});
exports.createUser = createUser;
const findUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        //console.log(email);
        const usuario = yield user_model_1.default.findOne({ email });
        if (usuario) {
            res.json(usuario);
        }
        else {
            res.status(404).json({ error: 'Usuario not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: `Ha ocurrido un error al tratar de buscar el usuario` });
    }
});
exports.findUserByEmail = findUserByEmail;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield user_model_1.default.find();
        if (usuarios) {
            res.json(usuarios);
        }
        else {
            res.status(500).json({ error: 'Ha ocurrido un error' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});
exports.getUsers = getUsers;
