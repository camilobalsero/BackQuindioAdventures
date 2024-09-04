import express from 'express';
import obtenerPlanesAdmin from '../controllers/planesAdmin-controller';
const router = express.Router();

router.get('/', obtenerPlanesAdmin);

export default router;
