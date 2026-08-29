import Joi from "joi";

export const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
});

export const createContactSchema = Joi.object({});

export const updateContactSchema = Joi.object({});
