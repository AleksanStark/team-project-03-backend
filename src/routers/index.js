import { Router } from 'express';
import usersRouter from './users.js';
import waterRouter from './water.js';
import authRouter from './auth.js';
import waterRateRouter from './waterRate.js';

const router = Router();

router.use('/user', usersRouter);
router.use('/water', waterRouter);
router.use('/auth', authRouter);
router.use('/water-rate', waterRateRouter);


export default router;
