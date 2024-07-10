import generateHash from "../helpers/generateHash";
import UserRepository from "../repositories/UserRepository";
import { Request, Response } from 'express';
import UserService from "../services/Userservice";

const reestablecer = async (req:Request, res: Response)=>{
    try {
        const {email, newPassword, confirmPassword} = req.body;
            if (newPassword !== confirmPassword) {
                return res.status(400).json(
                    { message: "Nueva contraseña y contraseña de confirmación no coinciden." }
                );
            }
            const changePasswordResult = await UserService.changePassword(email, newPassword);
        
            // Si el cambio de contraseña fue exitoso, actualizarla en la base de datos
            if (changePasswordResult.success) {
                const newPasswordHash = await generateHash(newPassword);
                await UserRepository.resetPassword(email, newPasswordHash);
                return res.status(200).json({ status: "Contraseña actualizada correctamente" });
            } else {
                // Si ocurrió algún error al cambiar la contraseña, devolver un error
                return res.status(500).json({ error: "Error al cambiar la contraseña" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
export default reestablecer;