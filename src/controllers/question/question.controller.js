import { Question } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';

export const getAllQuestions = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 10;
    const questions = await Question.findAndCountAll({
      order: [["createdAt", "ASC"]],
      where: {
        ...(req.query.templateId && {
          templateId: req.query.templateId,
        }),
      },
      // offset: (page - 1) * limit,
      // limit,
    });
    return successResponse(req, res, questions);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addQuestion = async (req, res) => {
  try {
    const {
      question_text: text,
      question_type: type,
      options,
      templateId,
    } = req.body;
    const payload = {
      text,
      type,
      templateId,
      options,
    };
    const response = await Question.create(payload);
    return successResponse(req, res, { questions: response });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateQuestion = async (req, res) => {
  try {
  const questionId = req.body.id;
  const { question_text, question_type, options } = req.body;

    const question = await Question.findByPk(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.text = question_text;
    question.type = question_type;
    question.options = options;

    const response = await question.save();

    return successResponse(req, res, { questions: response });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
