import express from 'express';
import registerAdminController from '../controllers/registerAdminController';
const router = express.Router();

router.post('/', registerAdminController);

export default router