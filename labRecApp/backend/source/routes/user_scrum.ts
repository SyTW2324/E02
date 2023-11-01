import {app} from '../server'
import { Request, Response } from "express";
import { createUser, getUsers, findUserByEmail} from '../controllers/user.controller';

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