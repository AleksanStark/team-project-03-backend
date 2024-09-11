import {
  getUserInfoById,
  updateUser,
  createUser,
  updatePassword,
} from '../services/users.js';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getUserInfoController = async (req, res) => {
  const user = req.user;
  // тут можна добавити {
  //   email: user.email,
  //   name: user.name,
  //   password: user.password,
  //   gender: user.gender,
  //   dailyNorma: user.dailyNorma,
  //   photo: user.photo,
  // }, і прибрати user в auth/login
  res.json({
    status: 200,
    message: 'Successfully found user info!',
    data: user,
  });
};

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
  const { password } = req.body;
  let photoUrl;
  let hashedPassword;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const result = await updateUser(req.user._id, {
    ...req.body,
    photo: photoUrl,
    password: hashedPassword,
  });

  if (!result) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully updated user data!`,
    data: {
      user: result.user,
      password: result.password,
    },
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

//==========================
export const updatePasswordController = async (req, res) => {
  const userId = req.user._id;
  const { oldPassword, newPassword } = req.body;

  try {
    await updatePassword(userId, oldPassword, newPassword);
    res.status(200).json({
      status: 200,
      message: 'Password updated successfully',
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};
