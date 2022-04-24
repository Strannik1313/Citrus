const express = require('express')
const controller = require('../controllers/order')
const router = express.Router()

router.post('/order', controller.order)

module.exports = router