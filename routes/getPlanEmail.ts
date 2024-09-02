import express from 'express';
import obtenerPlanesPorEmail from '../controllers/getPlansEmail-controller';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.get('/', validateToken, obtenerPlanesPorEmail);

export default router;
