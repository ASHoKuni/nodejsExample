const express = require('express');
const services = require('../services/services')

const router = express.Router()

router.route('/getServices').get(services.getAxio);

module.exports = router;