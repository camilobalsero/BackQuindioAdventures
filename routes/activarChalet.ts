import express from "express";
import activarChalet from '../controllers/activarChalet-controller';
import validateToken from "../middleware/validateToken";

const router = express.Router();
router.put('/', validateToken ,activarChalet);

export default router;
