import express from 'express';
import getOpinionPlan from '../controllers/getOpinionPlan-controller';
const router = express.Router();

router.get('/:id', getOpinionPlan);

export default router;
