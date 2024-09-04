import { Request, Response } from 'express';
import chaletService from '../services/chaletService';

const obtenerChaletsAdmin = async (req: Request, res: Response) => {
    try {
        const chalets = await chaletService.getAllChaletsAdmin();
        return res.status(200).json(chalets);
    } catch (error) {
        console.error("Error al obtener chalets:", error);
        return res.status(500).send({ error: 'Error interno del servidor' });
    }
}

export default obtenerChaletsAdmin;
