import { getUserInfoById, updateUser, createUser } from '../services/users.js';
import createHttpError from 'http-errors';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getUserInfoByIdController = async (req, res, next) => {
  const { userId } = req.params;
  // const user = await getUserInfoById(userId);

  // if (!user) {
  //   throw createHttpError(404, 'User not found');
  // }

  res.json({
    status: 200,
    message: `Successfully found info about user with id ${userId}!`,
    data: req.user,
  });
};

export const createUserController = async (req, res) => {
  const photo = req.file;
  let photoUrl;
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const user = await createUser({ ...req.body, photo: photoUrl });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a user!',
    data: user,
  });
};

export const patchUserController = async (req, res, next) => {
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateUser(req.user._id, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully updated user data!`,
    data: result.user,
  });
};

export const updateDailyNormaController = async (req, res) => {
  const userId = req.user._id; // Отримуємо userId з req.user
  const { dailyNorma } = req.body;

  try {
    const updatedUser = await updateDailyNorma(userId, dailyNorma);
    res.status(200).json({
      status: 200,
      message: 'Денна норма споживання води успішно оновлена.',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Помилка при оновленні денної норми води:', error);
    res.status(400).json({ message: error.message });
  }
};
