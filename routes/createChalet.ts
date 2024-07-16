import express from "express";
import crearChalet from '../controllers/createChalet-controller';
import validateToken from "../middleware/validateToken";

const router = express.Router();


router.post('/', validateToken, crearChalet);


export default router;