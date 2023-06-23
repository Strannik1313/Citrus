import express from 'express';
import OrderController from '@controllers/order.controller';
import { orderControllerValidator } from '@validators/order.controller.validator';

const router = express.Router();

router.post('/order', orderControllerValidator, OrderController.createOrder);

export { router as OrderRoutes };
