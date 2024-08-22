import express from 'express';
import obtenerChaletsId from '../controllers/getChaletId-controller';
const router = express.Router();

router.get('/', obtenerChaletsId);

export default router;
