const express = require('express')
const controller = require('../controllers/personal')
const passport = require('passport')
const router = express.Router()

router.post('/personal', passport.authenticate('jwt', {session: false}), controller.personal)

module.exports = router