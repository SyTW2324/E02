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
exports.updateRecord = exports.findRecordByEmail = exports.getRecords = exports.createRecordInput = void 0;
const record_model_1 = __importDefault(require("../db/models/record_model"));
const createRecordInput = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, estado, ubication, action, dateTime } = req.body;
        const newInput = new record_model_1.default({ name, email, estado, ubication, action, dateTime });
        yield newInput.save();
        res.status(201).json(newInput);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear una entrada para el registro laboral' });
    }
});
exports.createRecordInput = createRecordInput;
const getRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registros = yield record_model_1.default.find();
        if (registros) {
            res.json(registros);
        }
        else {
            res.status(500).json({ error: 'Ha ocurrido un error' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});
exports.getRecords = getRecords;
const findRecordByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        //console.log(email);
        const record_by_mail = yield record_model_1.default.findOne({ email });
        if (record_by_mail) {
            res.json(record_by_mail);
        }
        else {
            res.status(400).json({ error: 'Registro no encontrado not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: `Ha ocurrido un error al tratar de buscar el registro` });
    }
});
exports.findRecordByEmail = findRecordByEmail;
function formatHours(totalHours) {
    const hours = Math.floor(totalHours);
    const minutes = Math.floor((totalHours - hours) * 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}
const updateRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const { estado, ubication, action, dateTime, jornada } = req.body;
        const existingRecord = yield record_model_1.default.findOne({ email });
        if (!existingRecord) {
            res.status(404).json({ error: 'Registro no encontrado' });
            return;
        }
        //! PRIMERO APLICAMOS LOGICA... DESPUES REALIZAMOS LOS CAMBIOS CORRESPONDIENTES
        //* Logica de estados/accion
        //?tenemos en existing.action el valor actual de la accion que esta realizando el usuario
        //? y en action el valor que se quiere cambiar, realicemos sus correspondientes comparaciones
        //* 1.  Si el estado actual es "" solamente puede cambiarse por "iniciar" cualquier otra accion debería devolver error
        if (existingRecord.action === "" && action !== "iniciar") {
            res.status(400).json({ error: 'No se puede ejecutar esa acción, registrese en el trabajo primero' });
            return;
        }
        else if ((existingRecord.action === "iniciar" && action === "") || (existingRecord.action === "iniciar" && action === "iniciar") || (existingRecord.action === "iniciar" && action === "retorno")) {
            res.status(400).json({ error: `No se puede ejecutar esa acción, solamenete puede pausar o finalizar el trabajo` });
            return;
        }
        else if (existingRecord.action === "finalizar" && action !== "") {
            res.status(400).json({ error: 'No se puede ejecutar esa acción, espere al reseteo horario para poder iniciar una nueva jornada' });
            return;
        }
        else if (existingRecord.action === "pausa" && action !== "retorno") {
            res.status(400).json({ error: 'No se puede ejecutar esa acción, retorne su jornada laboral antes de iniciar cualquier otra acción' });
            return;
        }
        else if ((existingRecord.action === "retorno" && action === "") || (existingRecord.action === "retorno" && action === "iniciar") || (existingRecord.action === "retorno" && action == "retorno")) {
            res.status(400).json({ error: 'No se puede ejecutar esa acción, solamente puede pausar de nuevo o finalizar la jornada laboral' });
            return;
        }
        //* COMPROBACIONES DE LA FECHA
        if (dateTime) {
            const currentDate = new Date();
            const submittedDate = new Date(dateTime);
            currentDate.setSeconds(0);
            currentDate.setMilliseconds(0);
            submittedDate.setSeconds(0);
            submittedDate.setMilliseconds(0);
            if (submittedDate < currentDate) {
                res.status(400).json({ error: `La fecha y hora proporcionadas están en el pasado. current: ${currentDate}. sub: ${submittedDate}` });
                return;
            }
            const isSameDay = currentDate.toISOString().slice(0, 10) === submittedDate.toISOString().slice(0, 10);
            if (!isSameDay) {
                res.status(400).json({ error: 'La fecha proporcionada no es la fecha actual' });
                return;
            }
        }
        //* Seteo del estado
        if (action) {
            if (action === "iniciar" || action === "retorno") {
                existingRecord.estado = "online";
            }
            else if (action === "finalizar" || action === "") {
                existingRecord.estado = "offline";
            }
            else if (action === "pausa") {
                existingRecord.estado = "pause";
            }
        }
        else {
            existingRecord.estado = "offline";
        }
        //* Horas trabajadas
        //if (action) {
        //    if (action === "iniciar") {
        //        existingRecord.inicioJornada = new Date().toISOString(); // Guarda la hora de inicio
        //        existingRecord.horasTrabajadas = '0:00'; // Reinicia las horas trabajadas
        //    } else if (action === "finalizar") {
        //        const startDateTime = new Date(existingRecord.inicioJornada);
        //        const endDateTime = new Date();
        //        const hoursWorked = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
        //        existingRecord.horasTrabajadas = formatHours(hoursWorked);
        //    } else {
        //        const startDateTime = new Date(existingRecord.inicioJornada);
        //        const endDateTime = new Date();
        //        const hoursWorked = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
        //        const totalHours = parseFloat(existingRecord.horasTrabajadas) + hoursWorked;
        //        existingRecord.horasTrabajadas = formatHours(totalHours);
        //    }
        //} else {
        //    existingRecord.horasTrabajadas = "";
        //    existingRecord.inicioJornada = "";
        //}
        //* Seteo de datos
        existingRecord.ubication = ubication;
        existingRecord.action = action;
        existingRecord.dateTime = dateTime;
        existingRecord.jornada = jornada;
        yield existingRecord.save();
        res.json(existingRecord);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar el registro' });
    }
});
exports.updateRecord = updateRecord;
