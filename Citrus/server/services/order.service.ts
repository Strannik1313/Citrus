import { ServiceReturnType } from '@interfaces/ServiceReturnType';
import { OrderDto } from '@dto/OrderDto';
import { db } from '@config/db';
import crypto from 'crypto';
import { ProcessStatus } from '@enums/ProcessStatus';

export namespace OrderService {
	export async function createOrder(order: OrderDto): Promise<ServiceReturnType<OrderDto>> {
		try {
			const id = crypto.randomUUID();
			const ordersRef = db.collection('orders').doc(id);
			await ordersRef.set({
				name: order.name,
				surname: order.surname,
				phoneNumber: order.phoneNumber,
				...(!!order.email && { email: order.email }),
				...(!!order.comments && { comments: order.comments }),
				id,
			});
			const newOrder = await ordersRef.get();
			return {
				status: ProcessStatus.SUCCESS,
				data: newOrder.data() as OrderDto,
			};
		} catch (error) {
			return {
				status: ProcessStatus.ERROR,
				cause: error as Error,
				message: 'Не удалось создать мастера',
			};
		}
	}
}
