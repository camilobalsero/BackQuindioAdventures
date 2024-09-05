import express from "express";
import reservaPlanController from '../controllers/reservesPlan-controller';
import validateToken from "../middleware/validateToken";

const router = express.Router();


router.post('/', validateToken, reservaPlanController);


export default router;