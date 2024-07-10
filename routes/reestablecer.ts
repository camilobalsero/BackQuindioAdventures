import express from 'express';
import validateToken from '../middleware/validateToken';
import reestablecerPasswordController from '../controllers/reestablecerPassword-controller'
import { validator, validatorParams } from '../middleware/reestablecerPassword-validator';

const router = express.Router();

router.put('/', validateToken, validatorParams, validator, reestablecerPasswordController);

export default router;