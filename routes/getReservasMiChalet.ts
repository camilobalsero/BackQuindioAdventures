import express from 'express';
import obtenerReservasMiChalet from '../controllers/getReservasMiChalet-controller';
import validateToken from '../middleware/validateToken';
const router = express.Router();

router.get('/', validateToken, obtenerReservasMiChalet);

export default router;
