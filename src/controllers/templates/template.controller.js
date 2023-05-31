import { Templates } from "../../models";
import { successResponse, errorResponse, uniqueId } from "../../helpers";

export const getAllTemplates = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 10;
    const templates = await Templates.findAndCountAll({
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
