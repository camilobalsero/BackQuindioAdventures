import { Router } from 'express';

const router = Router();

// Ruta para verificar que el backend está funcionando
router.get('/', (req, res) => {
  res.send('Chat backend funcionando');
});

export default router;
