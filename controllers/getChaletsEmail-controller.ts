import { Request, Response } from "express";
import  chaletService  from '../services/chaletService'

const obtenerPlanPorId = async (req: Request, res: Response) =>{
    try{
        const email = res.locals.user.email;
        if(!email){
            return res.status(400).json({error: "El email del usuario es requerido"});
        }


        const chalets = await chaletService.getChaletsByEmail(email);
        console.log(chalets);

        if(!chalets){
            return res.status(404).json({error: "Chalets no encontrados"});
        }

        return res.status(200).json(chalets);
    }catch (error){
        console.log("Error al obtener el chalet:", error);
        return res.status(500).json({error: "Error interno del servidor"})
    }
}

export default obtenerPlanPorId;