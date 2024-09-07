import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a string',
    'any.required': 'Email is required',
  }),
  gender: Joi.string().valid('woman', 'man'),
  photo: Joi.string(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  email: Joi.string().email(),
  gender: Joi.string().valid('woman', 'man'),
  photo: Joi.string(),
});
