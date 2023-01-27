import express from 'express';
import OrderController from '@controllers/order.controller';

const router = express.Router();

router.patch('/order', OrderController.order);

export { router as OrderRoutes };
