import ReservesService from '../services/reservesService';
import { Request, Response} from "express";

const activarReservaPlan = async (req: Request, res: Response) => {
    try {
        const { idReserva } = req.params;

        if (!idReserva) {
            return res.status(400).json({ error: 'El ID de la reserva es requerido' });
        }

        const reservaCancelada = await ReservesService.activarReservaPlan(idReserva);

        if (!reservaCancelada) {
            return res.status(404).json({ error: 'Reserva no encontrada o ya cancelada' });
        }

        return res.status(200).json({ message: 'Reserva cancelada con éxito' });
    } catch (error) {
        console.error('Error al cancelar la reserva:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export default activarReservaPlan;
