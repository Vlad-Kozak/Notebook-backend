import Joi from "joi";

export const noteSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().required().max(50),
  categoryId: Joi.string().required(),
  content: Joi.string().required().max(1000),
}).required();

export const editedNoteSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().max(50),
  categoryId: Joi.string(),
  content: Joi.string().max(1000),
  archived: Joi.boolean(),
}).required();
