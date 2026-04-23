import { Router } from 'express';
import { getPendingLoads, acceptLoad } from '../controllers/loadController';

const router = Router();

router.get('/', getPendingLoads);
router.patch('/:id/accept', acceptLoad);

export default router;
