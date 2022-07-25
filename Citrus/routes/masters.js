const express = require('express')
const controller = require('../controllers/masters')
const router = express.Router()
const passport = require('passport')

router.get('/masters', controller.masters)
router.get('/services', controller.services)

module.exports = router