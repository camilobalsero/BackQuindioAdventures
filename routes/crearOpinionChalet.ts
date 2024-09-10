import express from "express";
import crearOpinionChalet from '../controllers/createOpinionChalet-controller';
import validateToken from "../middleware/validateToken";

const router = express.Router();


router.post('/', validateToken, crearOpinionChalet);


export default router;