const express = require('express');
const controller = require('../controllers/masters');
const router = express.Router();

router.post('/masters', controller.masters);

module.exports = router;
