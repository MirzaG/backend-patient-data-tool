import { Op } from "sequelize";
import { Templates, Question, Responses } from "../../models";
import { successResponse, errorResponse, uniqueId } from "../../helpers";
import { sendQuestionSMSToPatient } from "../sms/sms.controller";

export const getAllTemplates = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 10;
    const templates = await Templates.findAndCountAll({
      include: ["Questions"],
      order: [["createdAt", "DESC"]],
      // offset: (page - 1) * limit,
      // limit,
    });
    return successResponse(req, res, templates);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addTemplate = async (req, res) => {
  let response = [];
  try {
    const { name: Name } = req.body;
    if (Name) {
      const payload = {
        Name,
      };
      response = await Templates.create(payload);
    }
    return successResponse(req, res, { templates: response });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const sendTemplateToPatient = async (req, res) => {
  let response = [];
  try {
    const { templateId, patientContact } = req.body;

    const [{ id: questionId, text: questionText, options: questionOptions }] =
      await Question.findAll({
        where: { templateId },
        order: [["createdAt", "ASC"]],
        limit: 1,
      });
    const existingResponse = await Responses.findOne({
      where: {
        questionId,
        contactId: patientContact,
        response: { [Op.not]: null },
      },
    });
    if (existingResponse) {
      return errorResponse(req, res, "Patient responses already in progress.");
    }
    const payload = {
      questionId,
      contactId: patientContact,
      isSurveyCompleted: false,
    };
    response = await Responses.create(payload);
    const question = questionText + "\n" + questionOptions.toString();
    await sendQuestionSMSToPatient(question, patientContact);
    return successResponse(req, res, {
      msg: "Process initiated successfully",
      templates: [],
    });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
