import { Request, Response} from "express";
import AdminService from "../services/adminService";

const desactivarUsuarioController = async (req: Request, res: Response)=> {
    try {
        const {email} = req.body;

        const result : any= await AdminService.desactivarUsuario(email);

        return res.status(201).send({ status: 'Se desactivo correctamente el usuario'});
    } catch (error) {
        console.log(error);
        return error
    }
}

export default desactivarUsuarioController;
