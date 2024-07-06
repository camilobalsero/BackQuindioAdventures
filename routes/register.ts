import express from 'express';
import registerController from '../controllers/registerController'
import {validatorParams , validator} from '../middleware/register-validator'
const router = express.Router();

router.post('/', validatorParams, validator, registerController);

export default router