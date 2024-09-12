import createHttpError from 'http-errors';
import {
  addWater,
  deleteWater,
  updateWater,
  fetchDailyService,
  fetchMonthlyService,
} from '../services/water.js';

//додавання нового запису про спожиту воду
export const addWaterController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { body } = req;

    const water = await addWater(userId, body); // додає запис до бази

    res.status(201).json({
      status: 201,
      message: 'Successfully created a record of the amount of water consumed!',
      data: water,
    });
  } catch (error) {
    console.error('Error adding water record:', error);
    next(createHttpError(500, 'Failed to add water record.'));
  }
};

//оновлення існуючого запису про споживання води
export const updateWaterController = async (req, res, next) => {
  const userId = req.user._id;
  const { idRecordWater } = req.params;

  const result = await updateWater(userId, idRecordWater, req.body); // оновлює запис на основі userId, idRecordWater
  
  if (!result) {
    next(
      createHttpError(
        404,
        'The record about consumed amount of water not found',
      ),
    );
    return; 
  }

  res.json({
    status: 200,
    message: `Successfully patched a record about consumed amount of water!`,
    data: result.value,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const userId = req.user._id;
  const { id: waterId } = req.params;
  const water = await deleteWater(userId, waterId);

  if (!water) {
    next(
      createHttpError(
        404,
        'The record about consumed amount of water not found',
      ),
    );
    return;
  }

  res.status(204).send();
};


//Отримання даних про споживання води за певний день
export const fetchDailyController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const date = req.params.date;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const result = await fetchDailyService(userId, date); //отримує дані про споживання води за день з бази даних

    if (!result || result.length === 0) {
      return res.status(200).json({ dateOrMonth: date, data: [] }); // Повертає порожній масив, якщо даних немає
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching daily water data:', error);
     next(createHttpError(500, 'Failed to fetch daily water data.'));
  }
};

//oтримання даних про споживання води за певний місяць
export const fetchMonthlyController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const month = req.params.month;

    const result = await fetchMonthlyService(userId, month);

    if (!result || result.dailyResults.length === 0) {
      return res.status(200).json({ month, data: [] }); // Повертає порожній масив, якщо даних немає
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching monthly water data:', error);
    next(createHttpError(500, 'Failed to fetch monthly water data.'));
  }
};