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
        } else {
            const validPwd = await bcrypt.compare(password, usuario.password) 
            if (!validPwd) {
                res.status(401).json({ error: 'Credenciales invalidas' })
            }
        }

        const _payload: payload = {
            userId: usuario?._id,
            role: 'usuario'
        }

        const tokenOptions = {
            expiresIn: '1h'
        }
        // Generamos una token de autentificacion con la librerisa jsonwebtoken
        const userToken = jwt.sign(_payload, secretKey, tokenOptions);

        res.status(200).json({userToken})
    } catch (error) {
        res.status(200).json({ error: 'No existen registros para los credenciales introducidos' })
    }
}