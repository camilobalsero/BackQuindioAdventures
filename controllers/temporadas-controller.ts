import { Request, Response } from 'express';
import ReservesService from '../services/reservesService';

const obtenerTemporada = async (req: Request, res: Response) => {
    try {
        const { fechaInicio } = req.body;

        if (!fechaInicio) {
            return res.status(400).json({ status: "Error", message: "Fecha de inicio requerida" });
        }

        const temporada = await ReservesService.getTemporadaByFechaInicio(new Date(fechaInicio));

        res.status(200).json({
            status: "Temporada encontrada",
            temporada: temporada
        });
    } catch (error) {
        const typedError = error as Error;
        res.status(500).json({
            status: "Error",
            message: typedError.message || 'Error desconocido'
        });
    }
};

export default obtenerTemporada;