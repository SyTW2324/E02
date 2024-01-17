import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import secretKey  from "../config/config"; 
import user from '../db/models/user_model'

async function obtenerDatosDelUsuario(decoded: any): Promise<any> {
    try {
      const usuario = await user.findById(decoded.userId);
      return {
        name: usuario?.name,
        surnames: usuario?.surnames,
        email: usuario?.email,
        dni: usuario?.dni,
        phone: usuario?.phone,
        administrator: usuario?.administrator,
        afiliateNumber: usuario?.afiliateNumber,
        vacationsDays: usuario?.vacationsDays
      };
    } catch (error) {
      // Maneja el error, por ejemplo, loguéalo y devuelve null o un objeto vacío
      console.error('Error al obtener los datos del usuario:', error);
      return null;
    }
  }

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
    return;
  }

  const secretKeyAsString: string = (secretKey as any).mongoURI;

  jwt.verify(token, secretKeyAsString, async (err, decoded) => {
    if (err) {
      res.status(403).json({ error: 'Acceso no autorizado. Token inválido.' });
      return;
    }

    // Decodificación exitosa, obtén los datos del usuario
    const userData = await obtenerDatosDelUsuario(decoded);

    // Si no se pueden obtener los datos del usuario, maneja el error adecuadamente
    if (!userData) {
      res.status(500).json({ error: 'Error al obtener los datos del usuario.' });
      return;
    }

    // Devuelve los datos del usuario junto con la respuesta
    res.status(200).json({ message: 'Token verificado con éxito.', userData });
  });
};