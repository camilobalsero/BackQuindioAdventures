import express from 'express';
import registerAdminController from '../controllers/authAdmin';
const router = express.Router();

router.post('/', registerAdminController);

export default router