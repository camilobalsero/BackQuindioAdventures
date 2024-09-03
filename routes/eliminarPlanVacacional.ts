import express from 'express';
import validateToken from '../middleware/validateToken';
import eliminarPlanController from '../controllers/eliminarPlanVacacional-controller'

const router = express.Router();
router.put('/',validateToken, eliminarPlanController);

export default router;