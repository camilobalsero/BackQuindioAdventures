import express from "express";
import activarUsuario from '../controllers/activarUsuario-controller';
import validateToken from "../middleware/validateToken";

const router = express.Router();
router.put('/', validateToken ,activarUsuario);

export default router;
