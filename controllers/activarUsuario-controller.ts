import { Request, Response} from "express";
import AdminService from "../services/adminService";

const activarUsuarioController = async (req: Request, res: Response)=> {
    try {
        const {email} = req.body;

        const result : any= await AdminService.activarUsuario(email);

        return res.status(201).send({ status: 'Se activo correctamente el usuario'});
    } catch (error) {
        console.log(error);
        return error
    }
}

export default activarUsuarioController;
