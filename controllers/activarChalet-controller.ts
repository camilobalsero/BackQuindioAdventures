import { Request, Response} from "express";
import chaletService from "../services/chaletService";

const activarChaletController = async (req: Request, res: Response)=> {
    try {
        const {id} = req.body;

        const result : any= await chaletService.activarChalet(id);

        return res.status(201).send({ status: 'Se activo correctamente el chalet'});
    } catch (error) {
        console.log(error);
        return error
    }
}

export default activarChaletController;
