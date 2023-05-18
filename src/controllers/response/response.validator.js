const Joi = require('joi');

let response = Joi.object().keys({
    questionId: Joi.number().required(),
  response: Joi.alternatives(
    Joi.string(),
    Joi.object()
  ).required()
})

export const addNewResponse = {
  body: {
    responses: Joi.array().items(response)
    .required(),
  },
};
