import express from 'express';
import validate from 'express-validation';

import * as smsController from '../controllers/sms/sms.controller';

const router = express.Router();

//= ===============================
// SMS routes
//= ===============================

router.post("/", smsController.receiveSMS);
router.get("/test", smsController.sendExampleSMS);

module.exports = router;
