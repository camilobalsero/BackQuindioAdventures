import express from 'express';
import obtenerReservasChalet from '../controllers/getReservasChalet-controller';
import validateToken from '../middleware/validateToken';
const router = express.Router();

router.get('/', validateToken, obtenerReservasChalet);

export default router;
