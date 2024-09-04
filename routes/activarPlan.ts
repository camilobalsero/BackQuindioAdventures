import express from "express";
import activarPlanController from "../controllers/activarPlan-controller";
import validateToken from "../middleware/validateToken";

const router = express.Router();
router.put('/', validateToken ,activarPlanController);

export default router;
