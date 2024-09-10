import { Request, Response } from 'express';
import planService from '../services/planService';

const obtenerPlanesAdmin = async (req: Request, res: Response) => {
    try {
        const chalets = await planService.getAllPlanesAdmin();
        return res.status(200).json(chalets);
    } catch (error) {
        console.error("Error al obtener chalets:", error);
        return res.status(500).send({ error: 'Error interno del servidor' });
    }
}

export default obtenerPlanesAdmin;
