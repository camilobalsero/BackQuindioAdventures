import { Request, Response } from "express";
import planService from "../services/planService";
import { log } from 'console';

const obtenerPlanPorId = async (req: Request, res: Response) =>{
    try{
        const { id } = req.params;
        if(!id){
            return res.status(400).json({error: "El ID del plan es requerido"});
        }

        const idNumber = parseInt(id, 10);

        if(isNaN(idNumber)){
            return res.status(400).json({error: "El ID debe ser un número válido"});
        }

        const plan = await planService.getPlanById(idNumber);
        console.log(plan);

        if(!plan){
            return res.status(404).json({error: "Plan no encontrado"});
        }

        return res.status(200).json(plan);
    }catch (error){
        console.log("Error al obtener el chalet:", error);
        return res.status(500).json({error: "Error interno del servidor"})
    }
}

export default obtenerPlanPorId;