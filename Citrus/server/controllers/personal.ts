import { db } from '../config/db.js';
import { errorHandler } from '../utils/errorHandler.js';
import { Request, Response } from 'express';
import { DocumentData } from '@google-cloud/firestore';

class PersonalController {
	async personal(req: Request, res: Response) {
		const client = db
			.collection('authorizedClients')
			.doc((<{ id: number }>req.user).id.toString());
		await client.get().then(() => {
			try {
				client.update({
					phoneNumber: req.body.phoneNumber,
					name: req.body.name,
					surname: req.body.surname,
				});
				res.status(200).json({
					message: 'Данные успешно добавлены',
				});
			} catch (error) {
				errorHandler(res, error);
			}
		});
	}
	async getPersonalOrders(req: Request, res: Response) {
		const ordersArray = db.collection('orders');
		const startItem = Number(req.headers.startitem);
		const pageSize = Number(req.headers.pagesize);
		await ordersArray.get().then(collection => {
			try {
				let array = [];
				let tempArray;
				let newCollection: Array<DocumentData> = [];
				collection.forEach(coll => {
					if (
						coll.data().clientName === (<{ name: number }>req.user).name &&
						coll.data().clientSurname ===
							(<{ surname: number }>req.user).surname &&
						coll.data().clientName === (<{ name: number }>req.user).name
					) {
						newCollection.push({
							...coll.data(),
							orderId: coll.id,
						});
					}
				});
				for (let i = 1; i <= newCollection.length; i++) {
					if (i >= startItem && i < startItem + pageSize) {
						tempArray = newCollection[i - 1];
						tempArray = {
							...tempArray,
							date: tempArray.date.toDate(),
							quantityOfOrders: newCollection.length,
						};
						array.push(tempArray);
					}
				}
				res.status(200).json(array);
			} catch (error) {
				errorHandler(res, error);
			}
		});
	}
}
export default new PersonalController();
