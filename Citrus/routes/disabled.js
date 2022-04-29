const express = require('express')
const controller = require('../controllers/disabled')
const router = express.Router()

router.get('/disabled', controller.disabled)

module.exports = router