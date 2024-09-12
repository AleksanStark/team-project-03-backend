import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';

export const getUserInfo = async (userId) => {
  const user = await UsersCollection.findById(userId);
  return user;
};

export const getUserInfoById = async (userId) => {
  const user = await UsersCollection.findById(userId);
  return user;
};

export const createUser = async (data) => {
  const user = await UsersCollection.create({ ...data });
  return user;
};

export const updateUser = async (userId, payload, options = {}) => {
  const rawResult = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    user: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const updatePassword = async (userId, oldPassword, newPassword) => {
  const user = await UsersCollection.findById(userId);
  console.log(userId);

  if (!user) throw createHttpError(404, 'User not found');

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw createHttpError(401, 'Current password is incorrect');

  const encryptedNewPassword = await bcrypt.hash(newPassword, 10);

  user.password = encryptedNewPassword;
  await user.save();
};
