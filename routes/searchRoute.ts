import { Router } from 'express';
import  searchController  from '../controllers/search-controller';

const router = Router();

router.post('/', searchController);

export default router;