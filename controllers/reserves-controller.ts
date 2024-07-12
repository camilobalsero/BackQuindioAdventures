import { Request, Response } from "express";
import UserService from "../services/Userservice";
import Reserva from "../Dto/reservesDto";

let reserva = async (req: Request, res: Response) => {
    try {
        const {
            cantAdultos,
            cantNinos,
            fechaInicio,
            fechaFin,
            documento,
            nombre,
        } = req.body;

        console.log("Datos recibidos en el cuerpo de la solicitud:", req.body);

        // Validar que todos los campos están presentes
        if ( !cantAdultos || !cantNinos  || !fechaInicio || !fechaFin || !documento || !nombre) {
            return res.status(400).json({ 
                status: 'Datos incompletos en la solicitud'
            });
        }        

        // Convertir strings a objetos de tipo Date
        const fechaInicioObj = new Date(fechaInicio);
        const fechaFinObj = new Date(fechaFin);

        // Validar que las fechas son válidas y tienen sentido
        if (isNaN(fechaInicioObj.getTime()) || isNaN(fechaFinObj.getTime())) {
            return res.status(400).json({
                status: 'Fechas inválidas'
            });
        }

        if (fechaInicioObj > fechaFinObj) {
            return res.status(400).json({
                status: 'La fecha de inicio no puede ser posterior a la fecha de fin'
            });
        }

        const nuevaReserva = new Reserva(documento, nombre, cantNinos, cantAdultos , fechaInicioObj, fechaFinObj);

        console.log("Nueva reserva creada:", nuevaReserva);

        const result: any = await UserService.crearReserva(nuevaReserva);

        console.log("Resultado de crearReserva:", result);

        if (result.logged) {
            console.log("Reserva registrada con éxito");
            return res.status(200).json({
                status: "Reserva registrada",
            });
        }
        return res.status(401).json({ 
            status: 'Fallo al realizar la reserva'
        });
    } catch (error: any) {
        console.error("Error en el controlador de reservas:", error);
        return res.status(401).json({ 
            status: 'No ingreso datos',
            error: error.message
        });
    }
};

export default reserva;