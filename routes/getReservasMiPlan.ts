import express from 'express';
import obtenerReservasMiPlan from '../controllers/getReservasMiPlan-controller';
import validateToken from '../middleware/validateToken';
const router = express.Router();

router.get('/', validateToken, obtenerReservasMiPlan);

export default router;
