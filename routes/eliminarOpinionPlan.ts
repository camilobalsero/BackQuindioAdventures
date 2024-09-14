import express from "express";
import eliminarOpinionPlan from '../controllers/eliminarOpinionPlan-controller';
import validateToken from "../middleware/validateToken";

const router = express.Router();
router.delete('/:id', validateToken, eliminarOpinionPlan);

export default router;
