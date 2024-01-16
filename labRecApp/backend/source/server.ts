import express from 'express';
import mongoose from 'mongoose';
import config from './config/config'
import { Request, Response } from "express";
import { createUser, findUserByEmail, getUsers } from './controllers/user.controller'
import { userLoginValidator } from './controllers/userLogin.controller'
import { createRecordInput, getRecords, findRecordByEmail, updateRecord } from './controllers/laboralRecord_controller'
import cors from 'cors';

// Nos conectamos a la base de datos:
mongoose.connect(config.mongoURI); // pasamos la URI de nuestra base de datos en la nube

// Configuramos el servidor express

const app = express();
const PORT = 3000;
app.use(express.json());// Usamos el middleware .json() para que las peticiones a la API se parseen en formato json
// Middleware para manejar solicitudes OPTIONS
app.options('*', cors());
app.use(cors());

// Evitamos el problema de no poder recibir solicitudes desde el front
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE'); // Métodos permitidos
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeceras permitidas
  next();
});

app.use(cors({
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
}));

app.use((err:any, req:any, res:any, next:any) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

app.post('/users', async (req: Request, res: Response) => {
  try {
    await createUser(req,res);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario'})
  }
});

app.get('/users', async (req:Request, res: Response) => {
  try {
    await getUsers(req,res);
  } catch (error) {
    res.status(500).json({error: `Users not found`})
  }
});

app.get('/users/:email', async (req:Request, res: Response) => {
  try {
    await findUserByEmail(req,res);
  } catch (error) {
    res.status(500).json({error: `Error al encontrar el usuario`});
  }
});

app.post('/users/login', async (req:Request, res: Response) => {
  try {
    await userLoginValidator(req, res);
  } catch (error) {
    res.status(500).json({error: `Error al encontrar el usuario`});
  }
});

//* REGISTRO LABORAL

app.post('/record', async (req: Request, res: Response) => {
  try {
    await createRecordInput(req,res);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear entrada para un nuevo registro laboral'})
  }
}) 

app.get('/record', async (req:Request, res: Response) => {
  try {
    await getRecords(req,res);
  } catch (error) {
    res.status(500).json({error: `Ha ocurrido un error mostrando los registros`})
  }
});

app.get('/record/:email', async (req:Request, res: Response) => {
  try {
    await findRecordByEmail(req,res);
  } catch (error) {
    res.status(500).json({error: `Ha ocurrido un error mostrando el registro`})
  }
});

app.patch('/record/:email', async (req:Request, res: Response) => {
  try {
    await updateRecord(req,res);
  } catch (error) {
    res.status(500).json(error)
  }
});

// * PUERTO DE ESCUCHA
app.listen(PORT, () => {
  console.log(`\n ** Servidor escuchando en el puerto ${PORT} **`)
})

