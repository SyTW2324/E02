import { Request, Response } from "express";
import user  from '../db/models/user_model'

//?Creamos un controlador para crear usuarios en la BBDD
//?Este controlador es solamente para yo crear los usuarios con peticiones HTTPS
//?Desde la app no se va a poder acceder a el.

// Un controlador es una función o conjunto de funciones que facilitan la tarea
// de realizar operaciones SCRUM.

export const createUser = async (req:Request, res:Response): Promise<void> => {
  try {
    const { name, surnames, email, password, user_type } = req.body;
    const newUser = new user( {name, surnames, email, password, user_type} );
    await newUser.save();
    res.status(201).json(newUser);
  } catch(error) {
    res.status(500).json({ error: 'Error al crear el usuario'});
  }
} 