import express from "express";
import obtenerTemporada from "../controllers/temporadas-controller";
import validateToken from "../middleware/validateToken";

const router = express.Router();


router.post('/', obtenerTemporada);


export default router;