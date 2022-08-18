const express = require('express');
const controller = require('../controllers/order');
const router = express.Router();

router.patch('/order', controller.order);

module.exports = router;
