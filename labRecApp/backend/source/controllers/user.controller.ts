import { Request, Response } from "express";
import user from '../db/models/user_model'
import bcrypt from 'bcrypt';

//?Creamos un controlador para crear usuarios en la BBDD
//?Este controlador es solamente para yo crear los usuarios con peticiones HTTPS
//?Desde la app no se va a poder acceder a el.

// Un controlador es una función o conjunto de funciones que facilitan la tarea
// de realizar operaciones SCRUM.

export const createUser = async (req:Request, res:Response): Promise<void> => {
  try {
    const { name, surnames, dni, phone, email, password, administrator, afiliateNumber, vacationsDays} = req.body;
    const newUser = new user({ name, surnames, dni, phone, email, password, administrator, afiliateNumber, vacationsDays });
    newUser.password = await bcrypt.hash(password, 5); // 5 representa el numero de rondas de hashing que bcrypt.
    await newUser.save();
    res.status(201).json(newUser);
  } catch(error) {
    res.status(500).json({ error: 'Error al crear el usuario'});
  }
} 

export const findUserByEmail = async (req:Request, res:Response): Promise<void> => {
  try {
    const { email } = req.params;
    //console.log(email);
    const usuario = await user.findOne({email});
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({error: 'Usuario not found'});
    }
  } catch (error) {
    res.status(500).json({error: `Ha ocurrido un error al tratar de buscar el usuario`});
  }
}

export const getUsers = async (req:Request, res:Response): Promise<void> => {
  try {
    const usuarios = await user.find();
    if (usuarios) {
      res.json(usuarios);
    } else {
      res.status(500).json({error: 'Ha ocurrido un error'})
    }
  } catch (error) {
    res.status(500).json({error: 'Ha ocurrido un error'})
  }
}