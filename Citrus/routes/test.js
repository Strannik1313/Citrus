const express = require('express')
const controller = require('../controllers/test')
const passport = require('passport')
const router = express.Router()

router.get('/test', passport.authenticate('jwt', {session: false}), controller.test)

module.exports = router