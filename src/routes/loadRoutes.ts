import { Router } from 'express';
import { getPendingLoads, acceptLoad, createLoad } from '../controllers/loadController';
import { seedLoads } from '../controllers/seedController';

const router = Router();

router.get('/', getPendingLoads);
router.post('/seed', seedLoads);      
router.patch('/:id/accept', acceptLoad);
router.post('/create', createLoad); 
export default router;
