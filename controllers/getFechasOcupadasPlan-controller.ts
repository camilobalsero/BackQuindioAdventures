import { Request, Response} from "express";
import planService from "../services/planService";


const getFechasOcupadas = async (req:Request, res:Response) => {
    try {
        const {id_plan} = req.params;
        console.log(id_plan);
        
        const idNumber = parseInt(id_plan, 10);

        const result : any= await planService.getFechasOcupadas(idNumber);

        return res.json(result);
    } catch (error) {
        console.log(error);
        return error
    }
}

export default getFechasOcupadas;