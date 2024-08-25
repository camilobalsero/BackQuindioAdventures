// routes/chatRoutes.ts
import express from "express";
import chatbotController from "../controllers/chatbot-controller";
import validateToken from "../middleware/validateToken";

const router = express.Router();

router.post('/', chatbotController);

export default router;