import { Responses, User, Question, Templates } from "../../models";
import { successResponse, errorResponse, uniqueId } from "../../helpers";

export const getAllResponsesForPatient = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 10;
    const responses = await Responses.findAndCountAll({
      where: {
        contactId: req.params.contactId,
      },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email", "role"],
        },
        {
          model: Question,
          include: [Templates],
        },
      ],
      // offset: (page - 1) * limit,
      // limit,
    });
    return successResponse(req, res, responses);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
export const getPatientResponsesUsers = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 10;
    const responses = await Responses.findAll({
      group: ["User.id"],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email", "role"],
        },
      ],
      attributes: ["User.id", "User.firstName"],
      // offset: (page - 1) * limit,
      // limit,
    });
    return successResponse(req, res, responses);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
export const getPatientResponsesByContactId = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 10;
    const responses = await Responses.findAll({
      group: ["contactId"],
      attributes: ["contactId"],
      // offset: (page - 1) * limit,
      // limit,
    });
    return successResponse(req, res, responses);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addResponse = async (req, res) => {
  try {
    const { responses: userResponses } = req.body;
    //Need to add validation that loggedIn user can submit his/her won data only.
    await removeUserResponses(req.params.userId);
    const mappedUserResponses = userResponses.map((row) => ({
      ...row,
      userId: req.params.userId,
    }));
    const response = await Responses.bulkCreate(mappedUserResponses, {
      returning: true,
    });
    return successResponse(req, res, { responses: response });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const removeUserResponses = async (userId) => {
  return Responses.destroy({
    where: {
      userId,
    },
  });
};
