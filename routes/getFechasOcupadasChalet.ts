import express from 'express';
import getFechasOcupadas from '../controllers/getFechasOcupadasChalet-controller';

const router = express.Router();

router.get('/:id_chalet', getFechasOcupadas);

export default router;
