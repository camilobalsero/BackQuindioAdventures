import { Request, Response } from 'express';
import chaletService from '../services/chaletService';

const getOpinionChalet = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(id, 3456789);
        

        if (!id) {
            return res.status(400).json({ error: "El ID del chalet es requerido" });
        }

        const idNumber = parseInt(id, 10);

        if (isNaN(idNumber)) {
            return res.status(400).json({ error: "El ID debe ser un número válido" });
        }

        const chalet = await chaletService.getOpinionChalet(idNumber);
        
        if (!chalet) {
            return res.status(404).json({ error: "Chalet no encontrado" });
        }

        return res.status(200).json(chalet);
    } catch (error) {
        console.error("Error al obtener el chalet:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export default getOpinionChalet;
