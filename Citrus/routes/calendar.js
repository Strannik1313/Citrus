const express = require('express')
const controller = require('../controllers/calendar')
const router = express.Router()
const passport = require('passport')

router.post('/calendar', controller.calendar)

module.exports = router