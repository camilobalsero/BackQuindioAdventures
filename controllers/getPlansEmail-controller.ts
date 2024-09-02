import { Request, Response } from "express";
import planService from "../services/planService";

const obtenerPlanesPorEmail = async (req: Request, res: Response) =>{
    try{
        const email = res.locals.user.email;
        if(!email){
            return res.status(400).json({error: "El email del usuario es requerido"});
        }


        const planes = await planService.getPlanesByEmail(email);
        console.log(planes);

        if(!planes){
            return res.status(404).json({error: "Planes no encontrados"});
        }

        return res.status(200).json(planes);
    }catch (error){
        console.log("Error al obtener el chalet:", error);
        return res.status(500).json({error: "Error interno del servidor"})
    }
}

export default obtenerPlanesPorEmail;