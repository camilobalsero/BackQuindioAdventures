import express from "express";
import eliminarOpinionChalet from '../controllers/eliminarOpinionChalet-controller';
import validateToken from "../middleware/validateToken";

const router = express.Router();
router.delete('/:id', validateToken, eliminarOpinionChalet);

export default router;
