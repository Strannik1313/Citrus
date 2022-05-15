const express = require('express')
const controller = require('../controllers/admin')
const router = express.Router()
const passport = require('passport')

router.get('/services', passport.authenticate('jwt', {session: false}), controller.services)
router.post('/master', passport.authenticate('jwt', {session: false}), controller.master)

module.exports = router