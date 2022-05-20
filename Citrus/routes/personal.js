const express = require('express')
const controller = require('../controllers/personal')
const passport = require('passport')
const router = express.Router()

router.post('/personal', passport.authenticate('jwt', {session: false}), controller.personal)
router.get('/personal/orders', passport.authenticate('jwt', {session: false}), controller.getPersonalOrders)

module.exports = router