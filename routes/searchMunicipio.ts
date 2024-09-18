import express from 'express';
import searchChaletsController from '../controllers/searchByMunicipio-controller'; // Ajusta la ruta al controlador

const router = express.Router();

// Define la ruta para manejar GET /search
router.get('/', searchChaletsController);

export default router;
