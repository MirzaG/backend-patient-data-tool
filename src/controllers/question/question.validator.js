const Joi = require('joi');

export const addNewQuestion = {
  body: {
    question_text: Joi.string().required(),
    question_type: Joi.string().required(),
    options: Joi.array().items(Joi.string())
      .required(),
  },
};

export const updateQuestion = {
  body: {
    id: Joi.number().required(),
    question_text: Joi.string().required(),
    question_type: Joi.string().required(),
    options: Joi.array().items(Joi.string())
      .required(),
  },
};
