import { Request, Response } from 'express';
import UserService from "../services/UserService";
import jwt from 'jsonwebtoken';

const solicitarRestablecimiento = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        
        // Verificar si el correo está registrado en la base de datos
        const user = await UserService.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Generar un token de restablecimiento con JWT
        const token = jwt.sign({ email }, 'camilo', { expiresIn: '10h' });

        // Enviar el correo electrónico con el enlace de restablecimiento
        const resetLink = `http://localhost:4200/cambiar-contrase%C3%B1a?token=${token}`;
        await UserService.sendResetPasswordEmail(email, resetLink);

        return res.status(200).json({ message: "Se ha enviado un enlace para restablecer la contraseña a tu email" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export default solicitarRestablecimiento;
