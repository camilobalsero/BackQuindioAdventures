import { Request, Response } from 'express';
import ReservesService from '../services/reservesService';
import Reserva from '../Dto/reservesDto';

const crearReserva = async (req: Request, res: Response) => {
    try {
        const {
            idChalet,
            precio,
            cantPersonas,
            estancia,
            fechaInicio,
            fechaFin,
            nombre
        } = req.body;

        // Obtener el email del usuario desde el token
        const email = res.locals.user.email;

        // Crear el objeto Reserva
        const reserva = new Reserva(idChalet, precio, cantPersonas, estancia, new Date(fechaInicio), new Date(fechaFin), nombre, email);

        // Insertar la reserva usando el servicio
        const reservaId = await ReservesService.createReserva(reserva);

        return res.status(201).json({ status: 'Reserva creada exitosamente', reservaId });
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export default crearReserva;
