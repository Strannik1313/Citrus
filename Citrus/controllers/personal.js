import db from '../config/db.js';
import errorHandler from '../utils/errorHandler.js';

class PersonalController {
	async personal(req, res) {
		const client = db
			.collection('authorizedClients')
			.doc(req.user.id.toString());
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
	async getPersonalOrders(req, res) {
		const ordersArray = db.collection('orders');
		const startItem = Number(req.headers.startitem);
		const pageSize = Number(req.headers.pagesize);
		await ordersArray.get().then(collection => {
			try {
				let array = [];
				let tempArray = [];
				let newCollection = [];
				collection.forEach(coll => {
					if (
						coll.data().clientName === req.user.name &&
						coll.data().clientSurname === req.user.surname &&
						coll.data().clientName === req.user.name
					) {
						newCollection.push({
							...coll.data(),
							orderId: coll.id,
						});
					}
				});
				for (let i = 1; i <= newCollection.length; i++) {
					if (i >= req.headers.startitem && i < startItem + pageSize) {
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
