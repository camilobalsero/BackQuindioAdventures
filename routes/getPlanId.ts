import express from 'express';
import obtenerPlanPorId from '../controllers/getPlanId-controller'

const router = express.Router();

router.get('/planes/:id', obtenerPlanPorId);

export default router;