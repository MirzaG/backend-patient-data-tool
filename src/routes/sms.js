import express from 'express';
import validate from 'express-validation';

import * as smsController from '../controllers/sms/sms.controller';

const router = express.Router();

//= ===============================
// SMS routes
//= ===============================

router.post(
  '/receive',
  smsController.receiveSMS,
);
router.get(
  '/send',
  smsController.sendSMS,
);

module.exports = router;
