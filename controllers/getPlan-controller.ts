import { Request, Response } from "express";
import planService from "../services/planService";

const obtenerPlanes = async (req:Request, res:Response) =>{
    try{
        const planes = await planService.getAllPlans();
        return res.status(200).json(planes)
    } catch(error){
        console.log("Error al obtener los planes:", error);
        return res.status(500).send({error: 'Error interno del servidor'})
    }

}

export default obtenerPlanes;