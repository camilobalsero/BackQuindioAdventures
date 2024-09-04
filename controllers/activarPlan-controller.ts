import { Request, Response} from "express";
import planService from "../services/planService";


const activarPlanController = async (req: Request, res: Response)=> {
    try {
        const {id} = req.body;
        const result : any= await planService.activarPlan(id);

        return res.status(201).send({ status: 'Se activo correctamente el chalet'});
    } catch (error) {
        console.log(error);
        return error
    }
}

export default activarPlanController;
