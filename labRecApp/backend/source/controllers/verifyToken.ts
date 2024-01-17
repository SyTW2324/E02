import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import secretKey  from "../config/config"; 
import user from '../db/models/user_model'

export async function obtenerDatosDelUsuario(decoded: any): Promise<any> {
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