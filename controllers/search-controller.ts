import { Request, Response } from 'express';
import chaletService from '../services/searchService';

const searchBothController = async (req: Request, res: Response) => {
  const searchTerm = req.query.q as string;

  try {
    // Llamamos al servicio que ahora usa el procedimiento almacenado
    const { chalets, plans } = await chaletService.searchBoth(searchTerm);

    if (chalets.length > 0 || plans.length > 0) {
      res.json({ chalets, plans }); // Devuelve los dos arreglos separados
    } else {
      res.status(404).json({ message: 'No se encontraron chalets ni planes vacacionales con ese nombre' });
    }
  } catch (error) {
    console.error('Error al buscar chalets y planes vacacionales:', error);
    res.status(500).send('Error al buscar chalets y planes vacacionales');
  }
};

export default searchBothController;
