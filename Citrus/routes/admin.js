const express = require('express')
const controller = require('../controllers/admin')
const router = express.Router()
const passport = require('passport')

router.get('/services', passport.authenticate('jwt', {session: false}), controller.services)
router.get('/orders', passport.authenticate('jwt', {session: false}), controller.orders)
router.post('/master', passport.authenticate('jwt', {session: false}), controller.master)
router.post('/service', passport.authenticate('jwt', {session: false}), controller.service)

module.exports = router