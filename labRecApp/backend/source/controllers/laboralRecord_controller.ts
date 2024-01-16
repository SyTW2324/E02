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

export const findRecordByEmail = async (req:Request, res:Response): Promise<void> => {
  try {
    const { email } = req.params;
    //console.log(email);
    const record_by_mail = await record.findOne({email});
    if (record_by_mail) {
      res.json(record_by_mail);
    } else {
      res.status(400).json({error: 'Registro no encontrado not found'});
    }
  } catch (error) {
    res.status(500).json({error: `Ha ocurrido un error al tratar de buscar el registro`});
  }
}

export const updateRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;
    const { estado, ubication, action, dateTime } = req.body;

    const existingRecord = await record.findOne({ email });

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
    } else if ((existingRecord.action === "iniciar" && action === "") || (existingRecord.action === "iniciar" && action === "iniciar")  || (existingRecord.action === "iniciar" && action === "retorno")) {
        res.status(400).json({ error: `No se puede ejecutar esa acción, solamenete puede pausar o finalizar el trabajo` });
        return;        
    } else if (existingRecord.action === "finalizar" && action !== "") {
        res.status(400).json({ error: 'No se puede ejecutar esa acción, espere al reseteo horario para poder iniciar una nueva jornada' });
        return;        
    } else if (existingRecord.action === "pausa" && action !== "retorno") {
        res.status(400).json({ error: 'No se puede ejecutar esa acción, retorne su jornada laboral antes de iniciar cualquier otra acción' });
        return;        
    } else if ((existingRecord.action === "retorno" && action === "") || (existingRecord.action === "retorno" && action === "iniciar") || (existingRecord.action === "retorno" && action == "retorno")) {
        res.status(400).json({ error: 'No se puede ejecutar esa acción, solamente puede pausar de nuevo o finalizar la jornada laboral' });
        return;        
    }

    //* COMPROBACIONES DE LA FECHA
    const currentDate = new Date();
    const submittedDate = new Date(dateTime);

    console.log(currentDate)
    console.log(submittedDate)
    if (submittedDate < currentDate) {
        res.status(400).json({ error: `La fecha y hora proporcionadas están en el pasado. current: ${currentDate}. sub: ${submittedDate}` });
        return;
    }
  
    const isSameDay = currentDate.toISOString().slice(0, 10) === submittedDate.toISOString().slice(0, 10);
    if (!isSameDay) {
        res.status(400).json({ error: 'La fecha proporcionada no es la fecha actual' });
        return;
    }  
      
    //existingRecord.name = name || existingRecord.name;
    existingRecord.estado = estado; 
    existingRecord.ubication = ubication; 
    existingRecord.action = action;
    existingRecord.dateTime = dateTime;

    await existingRecord.save();

    res.json(existingRecord);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};