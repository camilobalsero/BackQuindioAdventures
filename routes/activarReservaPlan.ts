import express from "express";
import activarReservaPlan from "../controllers/activarReservaPlan-controller"

const router = express.Router();
router.put('/:idReserva', activarReservaPlan);

export default router;
