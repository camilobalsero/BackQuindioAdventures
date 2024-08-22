import { Request, Response } from 'express';
import chaletService from '../services/chaletService';

const obtenerChaletPorId = async (req: Request, res: Response) => {
    try {
        const { id_chalet } = req.body; // Obtener el ID del chalet desde el cuerpo de la solicitud

        if (!id_chalet) {
            return res.status(400).send({ error: "El ID del chalet es requerido" });
        }

        const chalet = await chaletService.getChaletById(id_chalet);

        if (!chalet) {
            return res.status(404).send({ error: "Chalet no encontrado" });
        }

        return res.status(200).send(chalet);
    } catch (error) {
        console.error("Error al obtener el chalet:", error);
        return res.status(500).send({ error: "Error interno del servidor" });
    }
};

export default obtenerChaletPorId;
