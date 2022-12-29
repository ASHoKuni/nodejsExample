const express = require('express');
const router = express.Router();
const sendEmailCron = require('../Cronjob/sendEmailCron');
const auth = require('../middleware/auth');


router.route('/sendEmail').get(auth(),sendEmailCron.sendEmailCron);
module.exports = router;