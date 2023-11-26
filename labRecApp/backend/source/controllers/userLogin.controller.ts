import { Request, Response } from "express";
import user from '../db/models/user_model'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { payload , secretKey } from '../interfaces/token_int'

export const userLoginValidator = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const usuario = await user.findOne({ email }); 
        if (!usuario) {
            res.status(401).json({ error: 'Credenciales invalidas' })
            return;
        } else {
            const validPwd = await bcrypt.compare(password, usuario.password) 
            if (!validPwd) {
                res.status(401).json({ error: 'Credenciales invalidas' })
                return
            }
        }

        const _payload: payload = {
            userId: usuario?._id,
            role: 'administrator'
        }

        const tokenOptions = {
            expiresIn: '1h'
        }
        // Generamos una token de autentificacion con la librerisa jsonwebtoken
        const userToken = jwt.sign(_payload, secretKey, tokenOptions);

        const responseData = {
            token: userToken,
            name: usuario?.name,
            surnames: usuario?.surnames,
            dni: usuario?.dni,
            phone: usuario?.phone,
            email: usuario?.email,
            password: usuario?.password,
            administrator: usuario?.administrator,
            afiliateNumber: usuario?.afiliateNumber,
            vacationsDays: usuario?.vacationsDays
        }

        res.status(200).json({responseData})
    } catch (error) {
        res.status(200).json({ error: 'No existen registros para los credenciales introducidos' })
    }
}