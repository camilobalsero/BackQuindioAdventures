import express from 'express';
import solicitarRestablecimiento from '../helpers/solicitudReestablecimiento';

const router = express.Router();
router.post('/',solicitarRestablecimiento);

export default router;