import express from 'express';
import validateToken from '../middleware/validateToken';
import eliminarChaletController from '../controllers/eliminarChalet-controller'

const router = express.Router();
router.put('/',validateToken, eliminarChaletController);

export default router;