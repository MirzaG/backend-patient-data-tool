import { successResponse, errorResponse, uniqueId } from "../../helpers";
import { Op } from "sequelize";

import response from "./custom_responses";
import { Reminders, Question, Responses, Templates } from "../../models";

const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSID, authToken);
const { MessagingResponse } = require("twilio").twiml;

export const sendExampleSMS = async (req, res) => {
  try {
    twilioClient.messages
      .create({
        body: "Hi there, Twillio working fine",
        from: process.env.TWILIO_SMS_FROM,
        to: process.env.TWILIO_SMS_TO,
      })
      .then((message) => console.log(message.sid));
    return successResponse(req, res, { status: 200 });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const sendReminderSMS = async (patientId) => {
  try {
    twilioClient.messages
      .create({
        body: response.REMINDER_TO_RESUME,
        from: process.env.TWILIO_SMS_FROM,
        to: process.env.TWILIO_SMS_TO,
      })
      .then((message) => console.log(message.sid));
    return { status: 200 };
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const sendQuestionSMSToPatient = async (question, patientId) => {
  try {
    await twilioClient.messages
      .create({
        body: question,
        from: process.env.TWILIO_SMS_FROM,
        to: patientId || process.env.TWILIO_SMS_TO,
      })
      .then(async (message) => {
        // await Reminders.create({ contactId: patientId });
      });
    return { status: 200 };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export const sendClosingSMSToPatient = async (patientId) => {
  try {
    await twilioClient.messages
      .create({
        body: response.CLOSE_CONVERSATION,
        from: process.env.TWILIO_SMS_FROM,
        to: patientId || process.env.TWILIO_SMS_TO,
      })
      .then(async (message) => {
        console.log("Closing SMS sent");
      });
    return { status: 200 };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export const receiveSMS = async (req, res) => {
  try {
    console.log("SMS Received");
    const {
      Body,
      From,
      NumSegments,
      MessageSid,
      MediaUrl0,
      MediaContentType0,
      NumMedia,
    } = req.body;

    //Save response in DB
    const lastResponse = await Responses.findOne({
      where: {
        contactId: From,
        responseTime: null,
        response: null,
      },
      order: [["id", "ASC"]],
      limit: 1,
    });
    if (lastResponse && lastResponse.id) {
      //Save Response
      lastResponse.responseTime = new Date();
      lastResponse.response =
        NumMedia && MediaUrl0 ? Body + "\n" + MediaUrl0 : Body;
      await lastResponse.save();

      // Send next question
      const nextQuestion = await Question.findOne({
        where: {
          id: lastResponse.questionId,
        },
        include: [
          {
            model: Templates,
            include: [
              {
                model: Question,
                where: {
                  id: { [Op.gt]: lastResponse.questionId },
                },
                order: [["id", "ASC"]],
              },
            ],
          },
        ],
      });

      if (
        nextQuestion.Template &&
        nextQuestion.Template.Questions &&
        nextQuestion.Template.Questions.length
      ) {
        // We have next question
        const _nextQuesiton = nextQuestion.Template.Questions[0];
        const twiml = new MessagingResponse();
        twiml.message(
          _nextQuesiton.text +
            "\n" +
            _nextQuesiton.options.toString().replaceAll(",", "\n")
        );
        const payload = {
          questionId: _nextQuesiton.id,
          contactId: From,
          isSurveyCompleted: false,
        };
        await Responses.create(payload);
        res.type("text/xml").send(twiml.toString());
        return;
      } else {
        // No next question. Mark in db and send closing message.
        lastResponse.isSurveyCompleted = true;
        lastResponse.save();
        await sendClosingSMSToPatient(From);
      }
    }
    return successResponse(req, res, { status: 200 });
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, error.message);
  }
};
