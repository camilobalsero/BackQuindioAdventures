import express from "express";
import cancelarReserva from "../controllers/cancelarReserva-controller";

const router = express.Router();
router.put('/:idReserva', cancelarReserva);

export default router;
