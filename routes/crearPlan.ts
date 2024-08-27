import express from "express";
import crearPlan from '../controllers/createPlanVacacional-controller';
import validateToken from "../middleware/validateToken";

const router = express.Router();


router.post('/', validateToken, crearPlan);


export default router;