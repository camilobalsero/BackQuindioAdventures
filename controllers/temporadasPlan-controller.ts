import { Request, Response } from 'express';
import ReservesService from '../services/reservesService';

const obtenerTarifasPlan = async (req: Request, res: Response) => {
    try {
        const { idPlan, fechaPlan } = req.body;

        // Verifica si `fechaInicio` es un string
        if (!idPlan || !fechaPlan) {
            console.log(fechaPlan, 2345);
            return res.status(400).json({ status: "Error", message: "ID del plan y fecha de inicio requeridos" });
        }

        // Convertir `fechaInicio` a una instancia de Date si es un string
        const fechaInicioDate = typeof fechaPlan === 'string' ? new Date(fechaPlan) : fechaPlan;

        if (isNaN(fechaInicioDate.getTime())) {
            return res.status(400).json({ status: "Error", message: "Fecha de inicio inválida" });
        }

        // Obtener temporada por fecha de inicio
        const temporada = await ReservesService.getTemporadaByFechaInicio(fechaInicioDate);
        
        // Obtener tarifas basadas en el ID del chalet y la temporada
        console.log(temporada, 23456);
        const tarifas = await ReservesService.getTarifasByPlanAndTemporada(idPlan, temporada);

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

export default obtenerTarifasPlan;
