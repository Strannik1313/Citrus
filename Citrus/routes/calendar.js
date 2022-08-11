const express = require('express');
const controller = require('../controllers/calendar');
const router = express.Router();

router.post('/calendar', controller.calendar);
router.post('/calendar/timesheets', controller.timesheets);

module.exports = router;
