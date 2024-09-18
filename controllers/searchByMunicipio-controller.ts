import { Request, Response } from 'express';
import chaletService from '../services/searchService';

const searchBothByMunicipioController = async (req: Request, res: Response) => {
  const municipioTerm = req.query.municipio as string;

  try {
    // Llamamos al servicio que ahora usa el procedimiento almacenado para buscar por municipio
    const { chalets, plans } = await chaletService.searchBothByMunicipio(municipioTerm);

    if (chalets.length > 0 || plans.length > 0) {
      res.json({ chalets, plans }); // Devuelve los dos arreglos separados
    } else {
      res.status(404).json({ message: 'No se encontraron chalets ni planes vacacionales en ese municipio' });
    }
  } catch (error) {
    console.error('Error al buscar chalets y planes vacacionales por municipio:', error);
    res.status(500).send('Error al buscar chalets y planes vacacionales por municipio');
  }
};

export default searchBothByMunicipioController;
