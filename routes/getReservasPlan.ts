import express from 'express';
import obtenerReservasPlan from '../controllers/getReservasPlan-controller';
import validateToken from '../middleware/validateToken';
const router = express.Router();

router.get('/', validateToken, obtenerReservasPlan);

export default router;
