import express from "express";
import obtenerTemporada from "../controllers/temporadas-controller";

const router = express.Router();


router.post('/', obtenerTemporada);


export default router;