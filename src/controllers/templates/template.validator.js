const Joi = require("joi");

export const addNewTemplate = {
  body: {
    name: Joi.string().required(),
  },
};

export const sendTemplateToPatient = {
  body: {
    templateId: Joi.number().required(),
    patientContact: Joi.string().required(),
  },
};
