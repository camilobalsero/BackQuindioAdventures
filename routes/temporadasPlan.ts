import express from "express";
import obtenerTemporadaPlan from "../controllers/temporadasPlan-controller";

const router = express.Router();


router.post('/', obtenerTemporadaPlan);


export default router;