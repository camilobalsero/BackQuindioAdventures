import express from 'express';
import obtenerPlanes from '../controllers/getPlan-controller';
const router = express.Router();

router.get('/', obtenerPlanes);

export default router;
