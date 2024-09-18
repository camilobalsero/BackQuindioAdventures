import express from 'express';
import getFechasOcupadas from '../controllers/getFechasOcupadasPlan-controller';

const router = express.Router();

router.get('/:id_plan', getFechasOcupadas);

export default router;
