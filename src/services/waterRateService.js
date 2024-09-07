import { UsersCollection } from '../db/models/user.js';

export const updateDailyNorma = async (userId, dailyNorma) => {
  if (dailyNorma < 1 || dailyNorma > 15000) {
    throw new Error(
      'The daily rate of water consumption should be between 1 and 15000 ml!',
    );
  }

  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw new Error('User not found!');
  }

  user.dailyNorma = dailyNorma;
  await user.save();

  return user;
};
