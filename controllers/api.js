const express = require('express');
const router = express.Router();

var middleware = require('../middleware/getEvents')

router.get('/events',middleware.getEvents)

module.exports = router;

