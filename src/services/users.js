import { UsersCollection } from '../db/models/user.js';

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
