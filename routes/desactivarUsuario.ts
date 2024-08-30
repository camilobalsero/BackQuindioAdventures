import express from "express";
import desactivarUsuario from '../controllers/desactivarUsuario-controller';
import validateToken from "../middleware/validateToken";

const router = express.Router();
router.put('/', validateToken, desactivarUsuario);

export default router;
