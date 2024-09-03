import express from 'express';
import reestablecerPasswordController from '../controllers/reestablecerPassword-controller'
import validateToken from '../middleware/validateToken';

const router = express.Router();
router.put('/',validateToken,reestablecerPasswordController);

export default router;