import { Request, Response } from "express";
import UserService from "../services/Userservice";
import { log } from "console";

const obtenerTodosLosUsuarios = async (req: Request, res: Response) =>{
    try{
        const usuarios = await UserService.obtenerTodosLosUsuarios();
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return res.status(500).send({error: 'Error interno del servidor'});
    }
}

export default obtenerTodosLosUsuarios;