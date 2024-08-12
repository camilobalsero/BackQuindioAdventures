import express from "express";
import validateToken from "../middleware/validateToken";
import authAdmin from "../controllers/authAdmin";

const router = express.Router();
router.post('/', authAdmin);

export default router;
