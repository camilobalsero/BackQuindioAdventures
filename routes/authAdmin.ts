import express from "express";
import authAdmin from "../controllers/authAdmin-controller";

const router = express.Router();
router.post('/', authAdmin);

export default router;
