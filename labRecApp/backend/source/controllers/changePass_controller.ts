import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import user from '../db/models/user_model'

export const changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, oldPass, newPass } = req.body;
        console.log("Servido:\n")
        console.log(email)
        const usuario = await user.findOne({ email }); 
        console.log(usuario)
        if (!usuario) {
            res.status(401).json({ error: 'No existe el usuario' })
            return;
        } else {
            const validPwd = await bcrypt.compare(oldPass, usuario.password) 
            if (validPwd) {
                const isPasswordValid = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPass);
                if (!isPasswordValid) {
                    res.status(401).json({error: "La contraseña ha de tener 8 caracteres, un número y una letra mayuscula al menos."})
                    return;
                } else {
                    const newPassword = await bcrypt.hash(newPass, 5);
                    usuario.password = newPassword;
                    res.status(201).json({message: "Se ha modificado la contraseña"});
                }
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al tratar de cambiar la contraseña'});
    }
};