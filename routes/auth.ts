import express from "express";
import authController from '../controllers/auth-controller';
import {validatorParams , validator} from '../middleware/auth-validator'
const router = express.Router();


router.post('/', validatorParams, validator, authController);


export default router;