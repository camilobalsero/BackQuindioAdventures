import { Request, Response} from "express";
import planService from "../services/planService";

const eliminarPlanController = async (req: Request, res: Response)=> {
    try {
        const {id} = req.body;

        const result : any= await planService.eliminarPlan(id);

        return res.status(201).send({ status: 'Se elimino c orrectamente el plan vacacional'});
    } catch (error) {
        console.log(error);
        return error
    }
}

export default eliminarPlanController;

