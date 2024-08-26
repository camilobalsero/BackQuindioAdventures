import { Request, Response } from 'express';
import ReservesService from '../services/reservesService';

const obtenerTarifas = async (req: Request, res: Response) => {
    try {
        const { idChalet, fechaInicio } = req.body;

        if (!idChalet || !fechaInicio) {
            return res.status(400).json({ status: "Error", message: "ID del chalet y fecha de inicio requeridos" });
        }

        // Obtener temporada por fecha de inicio
        const temporada = await ReservesService.getTemporadaByFechaInicio(new Date(fechaInicio));
        // Obtener tarifas basadas en el ID del chalet y la temporada
        const tarifas = await ReservesService.getTarifasByChaletAndTemporada(idChalet, temporada);

        res.status(200).json({
            status: "Tarifas encontradas",
            tarifas: tarifas
        });
    } catch (error) {
        const typedError = error as Error;
        res.status(500).json({
            status: "Error",
            message: typedError.message || 'Error desconocido'
        });
    }
};

export default obtenerTarifas;
