import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from "../services/UserService";

const restablecerConToken = async (req: Request, res: Response) => {
    try {
      const token = req.headers['authorization']; 
      const { newPassword, confirmPassword } = req.body;


      if (!token) {
        return res.status(400).json({ message: "Token no proporcionado" });
      }
  
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Las contraseñas no coinciden" });
      }
  
      let email;
      try {
        const bearerToken = token.slice(7);
        const decoded = jwt.verify(bearerToken, 'camilo');
        email = (decoded as any).email;
      } catch (error) {
        return res.status(400).json({ message: "Token inválido o expirado" });
      }
  
      // Cambiar la contraseña del usuario
      const changePasswordResult = await UserService.changePassword(email, newPassword);
      if (changePasswordResult.success) {
        return res.status(200).json({ message: "Contraseña actualizada correctamente" });
      } else {
        return res.status(500).json({ error: "Error al cambiar la contraseña" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  };
  

export default restablecerConToken;
