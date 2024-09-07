import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least{#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email should be in a valid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).max(64).required().messages({
    'string.base': 'Password should be a string',
    'string.min': 'Password should have at least{#limit} characters',
    'string.max': 'Password should have at most {#limit} characters',
    'any.required': 'Password is required',
  }),
  dailyNorma: Joi.number().min(1500).max(15000).messages({
    'number.min': 'Daily norma of water should be at least {#limit} ml',
    'number.max': 'Daily norma of water should be at most {#limit} ml',
  }),
  gender: Joi.string().valid('woman', 'man'),
  photo: Joi.string().optional(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(8).max(64).required().messages({
    'string.base': 'Password should be a string',
    'string.min': 'Password should have at least{#limit} characters',
    'string.max': 'Password should have at most {#limit} characters',
    'any.required': 'Password is required',
  }),
  token: Joi.string().required(),
});

export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});
