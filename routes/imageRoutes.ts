import { Router } from 'express';
import imageController from '../controllers/imageController';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Ruta para subir archivos
router.post('/upload', upload.single('file'), imageController.uploadFile);

export default router;