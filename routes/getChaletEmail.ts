import express from 'express';
import obtenerChaletPorEmail from '../controllers/getChaletsEmail-controller';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.get('/', validateToken, obtenerChaletPorEmail);

export default router;
