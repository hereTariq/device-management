import Joi from 'joi';

export const signupValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().required(),
});
export const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export const deviceValidation = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    status: Joi.string().required(),
});
export const logValidation = Joi.object({
    event: Joi.string().required(),
    value: Joi.number().required(),
});
