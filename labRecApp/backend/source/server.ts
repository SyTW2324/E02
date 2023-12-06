import express from 'express';
import mongoose from 'mongoose';
import config from './config/config'
import { Request, Response } from "express";
import { createUser, findUserByEmail, getUsers } from './controllers/user.controller'
import { userLoginValidator } from './controllers/userLogin.controller'
import cors from 'cors';

// Nos conectamos a la base de datos:
mongoose.connect(config.mongoURI); // pasamos la URI de nuestra base de datos en la nube

// Configuramos el servidor express

const app = express();
const PORT = 3000;
app.use(express.json());// Usamos el middleware .json() para que las peticiones a la API se parseen en formato json
app.use(cors());
// Evitamos el problema de no poder recibir solicitudes desde el front
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen
  res.header('Access-Control-Allow-Methods', 'GET, POST'); // Métodos permitidos
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeceras permitidas
  next();
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
    res.status(404).json({error: `Users not found`})
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

app.listen(PORT, () => {
  console.log(`\n ** Servidor escuchando en el puerto ${PORT} **`)
})

