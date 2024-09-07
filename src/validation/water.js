import Joi from 'joi';

export const waterIntakeSchema = Joi.object({
  volume: Joi.number().min(1).max(5000).required().messages({
    'number.base': 'Amount of water should be a number',
    'number.min': 'Amount of water should have at least {#limit} ml',
    'number.max': 'Amount of water should have at most {#limit} ml',
    'any.required': '{#label} is required',
  }),
  date: Joi.string().required().messages({
    'date.base': 'Date must be valid',
    'any.required': 'Date is required',
  }),
});

export const updateWaterIntakeSchema = Joi.object({
  volume: Joi.number().min(1).max(5000).messages({
    'number.min': 'Amount of water should have at least {#limit} ml',
    'number.max': 'Amount of water should have at most {#limit} ml',
  }),
  date: Joi.string(),
});

export const dayNormalWaterSchema = Joi.object({
  dailyNorma: Joi.number().min(1).max(15000).required().messages({
    'number.base': 'Daily rate must be a number',
    'number.min': 'Minimum water rate - {#limit} ml',
    'number.max': 'Maximum water rate - {#limit} ml',
    'any.required': 'Daily rate is required',
  }),
});
