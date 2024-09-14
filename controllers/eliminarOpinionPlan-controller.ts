import { Request, Response} from "express";
import planService from "../services/planService";

const eliminarOpinionPlan = async (req: Request, res: Response)=> {
    try {
        const {id} = req.params;
        console.log(id,1234);
        
        const idNumber = parseInt(id, 10);

        const result : any= await planService.eliminarOpinion(idNumber);

        return res.status(201).send({ status: 'Se desactivo correctamente el usuario'});
    } catch (error) {
        console.log(error);
        return error
    }
}

export default eliminarOpinionPlan;
