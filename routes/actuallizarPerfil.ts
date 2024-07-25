import express from "express";
import actualizarPerfil from "../controllers/actualizarPerfil-controller";
import validateToken from "../middleware/validateToken";

const router = express.Router();

router.put('/', validateToken, actualizarPerfil);

export default router;
