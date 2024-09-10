import { Request, Response } from 'express';
import reservesService from '../services/reservesService';

const obtenerReservasPlan = async (req: Request, res: Response) => {
    const email = res.locals.user?.email; // Extraer el email del token

    if (!email) {
        return res.status(400).json({ error: 'Email no encontrado en el token' });
    }

    try {
        const reservas = await reservesService.getReservasPlanByEmail(email);
        return res.status(200).json(reservas);
    } catch (error) {
        console.error("Error al obtener reservas:", error);
        return res.status(500).send({ error: 'Error interno del servidor' });
    }
};

export default obtenerReservasPlan;
