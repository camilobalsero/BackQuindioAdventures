import { Request, Response } from "express";
import UserService from "../services/Userservice";

const userController = async (req: Request, res: Response) => {
    try {
        const email = res.locals.user.email; // Obtén el email del token
        const result = await UserService.getUserByEmail(email);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los datos del usuario" });
    }
};

export default userController;
