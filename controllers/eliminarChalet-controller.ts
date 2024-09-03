import { Request, Response} from "express";
import chaletService from "../services/chaletService";

const eliminarChaletController = async (req: Request, res: Response)=> {
    try {
        const {id} = req.body;

        const result : any= await chaletService.eliminarChalet(id);

        return res.status(201).send({ status: 'Se elimino correctamente el chalet'});
    } catch (error) {
        console.log(error);
        return error
    }
}

export default eliminarChaletController;
