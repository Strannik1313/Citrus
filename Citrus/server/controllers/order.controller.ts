import { Request, Response } from 'express';
import { ProcessStatus } from '@enums/ProcessStatus';
import { OrderDto } from '@dto/OrderDto';
import { OrderService } from '@services/order.service';

class OrderController {
	async createOrder(req: Request, res: Response) {
		const order: OrderDto = req.body;
		const createOrderResult = await OrderService.createOrder(order);
		switch (createOrderResult.status) {
			case ProcessStatus.SUCCESS: {
				res.status(200).send(createOrderResult.data);
				break;
			}
			case ProcessStatus.ERROR: {
				res.status(500).json(createOrderResult);
				break;
			}
		}
	}
}

export default new OrderController();
