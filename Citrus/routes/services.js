const express = require('express');
const controller = require('../controllers/services');
const router = express.Router();

router.get('/services', controller.services);

module.exports = router;
