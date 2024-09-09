import { Router } from 'express';
import {
  getUserInfoByIdController,
  createUserController,
  patchUserController,
  getUserInfoController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema, createUserSchema } from '../validation/users.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);
router.get('/info-user', ctrlWrapper(getUserInfoController));

router.get('/info', ctrlWrapper(getUserInfoByIdController));

router.patch(
  '/info/photo',
  upload.single('photo'),
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

router.patch(
  '/info/update',
  upload.single('photo'),
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

export default router;
