import { Request, Response} from "express";
import chaletService from "../services/chaletService";

const getFechasOcupadas = async (req:Request, res:Response) => {
    try {
        const {id_chalet} = req.params;
        console.log(id_chalet);
        
        const idNumber = parseInt(id_chalet, 10);

        const result : any= await chaletService.getFechasOcupadas(idNumber);

        return res.json(result);
    } catch (error) {
        console.log(error);
        return error
    }
}

export default getFechasOcupadas;