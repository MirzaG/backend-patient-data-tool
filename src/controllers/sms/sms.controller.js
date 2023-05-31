import { successResponse, errorResponse, uniqueId } from "../../helpers";
import response from "./custom_responses";

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

export const receiveSMS = async (req, res) => {
  try {
    const {
      Body,
      From,
      NumSegments,
      MessageSid,
      MediaUrl0,
      MediaContentType0,
      NumMedia,
    } = req.body;
    console.log(req.body);
    const twiml = new MessagingResponse();
    // On message receive
    // Check last question sent using phone number
    // Save response and send next question/closing response

    twiml.message("Thanks for your response!");

    res.type("text/xml").send(twiml.toString());
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
