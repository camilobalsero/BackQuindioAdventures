import express from "express";
import crearOpinionPlan from '../controllers/createOpinionPlan-controller';
import validateToken from "../middleware/validateToken";

const router = express.Router();


router.post('/', validateToken, crearOpinionPlan);


export default router;