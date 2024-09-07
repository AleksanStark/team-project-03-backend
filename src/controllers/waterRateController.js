import { updateDailyNorma } from '../services/waterRateService.js';

export const updateDailyNormaController = async (req, res) => {
  const userId = req.user._id;
  const { dailyNorma } = req.body;

  try {
    const updatedUser = await updateDailyNorma(userId, dailyNorma);
    res.status(200).json({
      status: 200,
      message: 'The daily water rate has been successfully updated!',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error updating daily water!', error);
    res.status(400).json({ message: error.message });
  }
};
