import express from 'express';
import obtenerChalets from '../controllers/getChalet-controller';
const router = express.Router();

router.get('/', obtenerChalets);

export default router;
