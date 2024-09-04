import express from 'express';
import obtenerChaletsAdmin from '../controllers/chaletsAdmin-controller';
const router = express.Router();

router.get('/', obtenerChaletsAdmin);

export default router;
