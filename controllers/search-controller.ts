import { Request, Response } from 'express';
import chaletService from '../services/searchService';

const searchBothController = async (req: Request, res: Response) => {
  const searchTerm = req.query.q as string;
  
  try {
    const results = await chaletService.searchBoth(searchTerm);
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({ message: 'No se encontraron chalets ni planes vacacionales con ese nombre' });
    }
  } catch (error) {
    console.error('Error al buscar chalets y planes vacacionales:', error);
    res.status(500).send('Error al buscar chalets y planes vacacionales');
  }
};

export default searchBothController;