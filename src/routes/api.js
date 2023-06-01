import express from 'express';
import validate from 'express-validation';

import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';

import * as questionController from '../controllers/question/question.controller';
import * as questionValidator from '../controllers/question/question.validator';

import * as submissionController from '../controllers/response/response.controller';
import * as submissionValidator from '../controllers/response/response.validator';

import * as templatesController from "../controllers/templates/template.controller";
import * as templatesValidator from "../controllers/templates/template.validator";

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get("/me", userController.profile);

router.post(
  "/changePassword",
  validate(userValidator.changePassword),
  userController.changePassword
);

router.post(
  "/questions",
  validate(questionValidator.addNewQuestion),
  questionController.addQuestion
);

router.put(
  "/questions",
  validate(questionValidator.updateQuestion),
  questionController.updateQuestion
);

router.get("/questions", questionController.getAllQuestions);

// Templates
router.post(
  "/templates",
  validate(templatesValidator.addNewTemplate),
  templatesController.addTemplate
);

router.get("/templates", templatesController.getAllTemplates);

// Patients

router.post(
  '/patient/:userId/responses',
  validate(submissionValidator.addNewResponse),
  submissionController.addResponse,
);

// router.get(
//   '/patient/:userId/responses',
//   submissionController.getAllResponsesForPatient,
// );
router.get(
  "/patient/:contactId/responses",
  submissionController.getAllResponsesForPatient
);


// router.get(
//   '/patient/responses/summary',
//   submissionController.getPatientResponsesUsers,
// );
router.get(
  "/patient/responses/summary",
  submissionController.getPatientResponsesByContactId
);
router.post(
  "/template/patient",
  validate(templatesValidator.sendTemplateToPatient),
  templatesController.sendTemplateToPatient
);

module.exports = router;
