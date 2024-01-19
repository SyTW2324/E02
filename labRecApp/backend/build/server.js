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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const user_controller_1 = require("./controllers/user.controller");
const userLogin_controller_1 = require("./controllers/userLogin.controller");
const laboralRecord_controller_1 = require("./controllers/laboralRecord_controller");
const changePass_controller_1 = require("./controllers/changePass_controller");
const config_2 = __importDefault(require("./config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken_1 = require("./controllers/verifyToken");
// Nos conectamos a la base de datos:
mongoose_1.default.connect(config_1.default.mongoURI); // pasamos la URI de nuestra base de datos en la nube
// Configuramos el servidor express
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json()); // Usamos el middleware .json() para que las peticiones a la API se parseen en formato json
// Middleware para manejar solicitudes OPTIONS
//app.options('*', cors());
//app.use(cors());
//!mas opciones si fuese necesaio
// Evitamos el problema de no poder recibir solicitudes desde el front
//app.use((req, res, next) => {
//  res.header('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen
//  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE'); // Métodos permitidos
//  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeceras permitidas
//  next();
//});
//
//app.use(cors({
//  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PATCH, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_controller_1.createUser)(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
}));
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_controller_1.getUsers)(req, res);
    }
    catch (error) {
        res.status(500).json({ error: `Users not found` });
    }
}));
app.get('/users/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_controller_1.findUserByEmail)(req, res);
    }
    catch (error) {
        res.status(500).json({ error: `Error al encontrar el usuario` });
    }
}));
app.post('/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, userLogin_controller_1.userLoginValidator)(req, res);
    }
    catch (error) {
        res.status(500).json({ error: `Error al encontrar el usuario` });
    }
}));
//* VERIFICACION DEL TOKEN
app.get('/verify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
        }
        const secretKeyAsString = config_2.default.mongoURI;
        // Verifica el token
        jsonwebtoken_1.default.verify(token, secretKeyAsString, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({ error: 'Acceso no autorizado. Token inválido.' });
            }
            // Decodificación exitosa, obtén los datos del usuario
            const userData = yield (0, verifyToken_1.obtenerDatosDelUsuario)(decoded);
            // Si no se pueden obtener los datos del usuario, maneja el error adecuadamente
            if (!userData) {
                return res.status(500).json({ error: 'Error al obtener los datos del usuario.' });
            }
            // Devuelve los datos del usuario junto con la respuesta
            res.status(200).json({ message: 'Token verificado con éxito.', userData });
        }));
    }
    catch (error) {
        console.error('Error al manejar la solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}));
//* REGISTRO LABORAL
app.post('/record', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, laboralRecord_controller_1.createRecordInput)(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear entrada para un nuevo registro laboral' });
    }
}));
app.get('/record', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, laboralRecord_controller_1.getRecords)(req, res);
    }
    catch (error) {
        res.status(500).json({ error: `Ha ocurrido un error mostrando los registros` });
    }
}));
app.get('/record/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, laboralRecord_controller_1.findRecordByEmail)(req, res);
    }
    catch (error) {
        res.status(500).json({ error: `Ha ocurrido un error mostrando el registro` });
    }
}));
app.patch('/record/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, laboralRecord_controller_1.updateRecord)(req, res);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
// * Cambio de contraseña
app.patch('/change/password/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, changePass_controller_1.changePassword)(req, res);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
// * PUERTO DE ESCUCHA
app.listen(PORT, () => {
    console.log(`\n ** Servidor escuchando en el puerto ${PORT} **`);
});
