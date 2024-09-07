import { Router } from 'express';
import {
  addWaterController,
  deleteWaterController,
  updateWaterController,
  fetchDailyController,
  fetchMonthlyController,
} from '../controllers/water.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  waterIntakeSchema,
  updateWaterIntakeSchema,
} from '../validation/water.js';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  validateBody(waterIntakeSchema),
  ctrlWrapper(addWaterController),
);

router.patch(
  '/:idRecordWater',
  validateBody(updateWaterIntakeSchema),
  ctrlWrapper(updateWaterController),
);

router.delete('/:id', ctrlWrapper(deleteWaterController));

router.get('/daily/:date', ctrlWrapper(fetchDailyController));

router.get('/monthly/:month', ctrlWrapper(fetchMonthlyController));

export default router;

//відповідає за обробку всіх запитів
