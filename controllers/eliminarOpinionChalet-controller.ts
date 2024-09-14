import { Request, Response} from "express";
import chaletService from "../services/chaletService";

const eliminarOpinionChalet = async (req: Request, res: Response)=> {
    try {
        const {id} = req.params;

        const idNumber = parseInt(id, 10);

        const result : any= await chaletService.eliminarOpinion(idNumber);

        return res.status(201).send({ status: 'Se desactivo correctamente el usuario'});
    } catch (error) {
        console.log(error);
        return error
    }
}

export default eliminarOpinionChalet;
