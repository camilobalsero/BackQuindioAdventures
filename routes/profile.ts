import express from "express";
import userController from '../controllers/profile-controller';
import validateToken from "../middleware/validateToken";

const router = express.Router();

router.get('/', validateToken, userController);

export default router;
