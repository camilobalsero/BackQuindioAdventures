import express from 'express';
import recommended from '../controllers/recommended-controller';
const router = express.Router();

router.get('/', recommended);

export default router;
