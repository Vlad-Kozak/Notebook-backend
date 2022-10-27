import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().required().max(50),
  photoURL: Joi.string().required(),
}).required();
