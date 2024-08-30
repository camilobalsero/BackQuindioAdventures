import express from 'express';
import obtenerTodosLosUsuarios from '../controllers/getUsuarios-controller';

const router = express.Router();

router.get('/', obtenerTodosLosUsuarios);

export default router;