import express from "express";
import reservaController from '../controllers/reserves-controller';
import validateToken from "../middleware/validateToken";

const router = express.Router();


router.post('/', validateToken, reservaController);


export default router;