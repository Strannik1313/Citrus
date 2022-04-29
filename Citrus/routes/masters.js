const express = require('express')
const controller = require('../controllers/masters')
const router = express.Router()
const passport = require('passport')

router.get('/masters', controller.masters)

module.exports = router