import express from 'express';
import OrderController from '../controllers/order.js';
const router = express.Router();

router.patch('/order', OrderController.order);

export { router as OrderRoutes };
