import { Request, Response } from "express";
import UserService from "../services/Userservice";
import Reserva from "../Dto/ReservasDto";

let reserva = async (req: Request, res: Response) => {
    try{
        const{
            email,
            documento,
            precio,
            cantPersonas,
            estancia,
            fechaInicio,
            fechaFin
        } = req.body
        console.log(req.body)
        const result : any = await UserService.crearReserva(new Reserva(email,documento,precio,cantPersonas,estancia,fechaInicio,fechaFin))
        if (result.logged) {
            
            return res.status(200).json({
                status: "Reserva registrada",
            })
        }
        return res.status(401).json({ 
            status: 'Fallo al realizar la reserva'
        });
    }catch (error : any){
        return res.status(401).json({ 
            status: 'No ingreso datos'
        });
    }
}


export default reserva;