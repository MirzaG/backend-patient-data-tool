const cron = require('node-cron');
const axios = require('axios');
const twilio = require('twilio');
const sequelize = require('sequelize');
const {Question} = require('../models/question');

// Configure the Twilio client with your account SID and auth token
const twillio_accountSid = process.env.TWILIO_ACCOUNT_SID;
const twillio_authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(twillio_accountSid, twillio_authToken);

// Function to send SMS using Twilio
const sendSMS = async (phoneNumber, message) => {
  try {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    console.log('SMS sent successfully!');
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};


// Define the schedule for the reminder job (runs every hour)
cron.schedule('0 */1 * * *', async () => {
  try {
    // Get the questions that have not been submitted within the time interval
      const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000); // 12 hours ago
      const unansweredQuestions = await Question.findAll({
      where: {
        createdAt: { [Op.lte]: twelveHoursAgo },
      },
    });

    // Send SMS reminders to the patients
    for (const question of unansweredQuestions) {
      const patient = await Patient.findByPk(question.patientId);
      if (patient && patient.phoneNumber) {
        const message = 'Reminder: Please submit your answers.';
        await sendSMS(patient.phoneNumber, message);
      }
    }
  } catch (error) {
    console.error('Error sending SMS reminders:', error);
  }
});

