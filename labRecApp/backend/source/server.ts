import express from 'express';
import mongoose from 'mongoose';
import config from './config/config'

// Nos conectamos a la base de datos:
mongoose.connect(config.mongoURI); // pasamos la URI de nuestra base de datos en la nube

// Configuramos el servidor express

const app = express();
const PORT = 3000;
app.use(express.json()); // Usamos el middleware .json() para que las peticiones a la API se parseen en formato json



app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})

