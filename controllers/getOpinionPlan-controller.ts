import { Request, Response } from 'express';
import planService from '../services/planService';

const getOpinionPlan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "El ID del plan es requerido" });
        }

        const idNumber = parseInt(id, 10);

        if (isNaN(idNumber)) {
            return res.status(400).json({ error: "El ID debe ser un número válido" });
        }

        const chalet = await planService.getOpinionPlan(idNumber);
        
        if (!chalet) {
            return res.status(404).json({ error: "Chalet no encontrado" });
        }

        return res.status(200).json(chalet);
    } catch (error) {
        console.error("Error al obtener el chalet:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export default getOpinionPlan;
