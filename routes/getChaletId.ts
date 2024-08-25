import express from 'express';
import obtenerChaletPorId from '../controllers/getChaletId-controller';

const router = express.Router();

router.get('/chalets/:id', obtenerChaletPorId);

export default router;
