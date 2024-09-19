import { Request, Response } from "express";
import recommendedService from "../services/recommendedService";

const recommended = async (req:Request, res:Response) =>{
    try{

        const recommended = await recommendedService.recommended();
        return res.status(200).json(recommended)
    } catch(error){
        console.log("Error al obtener los planes:", error);
        return res.status(500).send({error: 'Error interno del servidor'})
    }

}

export default recommended;