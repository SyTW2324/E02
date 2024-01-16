import { Request, Response } from "express";
import record from "../db/models/record_model"

export const createRecordInput = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, estado, ubication, action, dateTime } = req.body;
        const newInput = new record({ name, email, estado, ubication, action, dateTime  });
        await newInput.save();
        res.status(201).json(newInput);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear una entrada para el registro laboral'});
    }
}

export const getRecords = async (req:Request, res:Response): Promise<void> => {
  try {
    const registros = await record.find();
    if (registros) {
      res.json(registros);
    } else {
      res.status(500).json({error: 'Ha ocurrido un error'})
    }
  } catch (error) {
    res.status(500).json({error: 'Ha ocurrido un error'})
  }
}
