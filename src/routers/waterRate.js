import { Router } from 'express';
import { updateDailyNormaController } from '../controllers/waterRateController.js';

const router = Router();

router.patch('/', updateDailyNormaController);

export default router;
