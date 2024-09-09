import express from "express";
import cancelarReservaPlan from "../controllers/cancelarReservaPlan-controller"

const router = express.Router();
router.put('/:idReserva', cancelarReservaPlan);

export default router;
