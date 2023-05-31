const Joi = require("joi");

export const addNewTemplate = {
  body: {
    name: Joi.string().required(),
  },
};
