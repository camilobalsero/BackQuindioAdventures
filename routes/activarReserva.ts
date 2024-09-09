import express from "express";
import activarReserva from "../controllers/activarReserva-controller";

const router = express.Router();
router.put('/:idReserva', activarReserva);

export default router;
