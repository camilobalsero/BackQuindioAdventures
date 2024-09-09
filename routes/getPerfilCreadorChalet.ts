import express from 'express';
import getPerfilCreadorChalet from '../controllers/getPerfilCreadorChalet-controller';
const router = express.Router();

router.get('/:id', getPerfilCreadorChalet);

export default router;
