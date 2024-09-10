import express from 'express';
import getOpinionChalet from '../controllers/getOpinionChalet-controller';
const router = express.Router();

router.get('/', getOpinionChalet);

export default router;
