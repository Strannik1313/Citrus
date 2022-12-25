import dayjs from 'dayjs';
import db from '../config/db.js';
import errorHandler from '../utils/errorHandler.js';

class OrderController {
	async order(req, res) {
		let idOrder = 0;
		let dateExist = false;
		let dateDocId = '';
		const dateArray = [];
		const ordersArray = db.collection('orders');
		const calendarCollection = db.collection('calendar');
		await calendarCollection
			.where('masterId', '==', req.body.masterId)
			.get()
			.then(collection => {
				try {
					collection.forEach(timesheet => {
						if (
							timesheet.data().freeTimes.filter(time => {
								if (dayjs(time.toDate()).isSame(req.body.dateOrder, 'hour')) {
									return true;
								}
								dateArray.push(time.toDate());
								return false;
							}).length !== null
						) {
							dateExist = true;
							dateDocId = timesheet.id;
						} else {
							dateExist = false;
							res.status(404).json({ message: 'Not found' });
							return;
						}
					});
				} catch (error) {
					errorHandler(res, error);
				}
				try {
					calendarCollection.doc(dateDocId).update({
						freeTimes: dateArray,
					});
				} catch (error) {
					errorHandler(res, error);
				}
			});
		if (dateExist) {
			await ordersArray.get().then(data => {
				data.forEach(d => {
					if (Number(d.id) > idOrder) {
						idOrder = Number(d.id);
					}
				});
				idOrder++;
				try {
					db.collection('orders').doc(idOrder.toString()).set({
						name: req.body.name,
						surname: req.body.surname,
						comments: req.body.comments,
						dateOrder: req.body.dateOrder,
						masterName: req.body.masterName,
						masterId: req.body.masterId,
						phoneNumber: req.body.phoneNumber,
						serviceName: req.body.serviceName,
						serviceId: req.body.serviceId,
						email: req.body.email,
						isDoneByAdmin: false,
					});

					res.status(200).json({ message: true });
				} catch (error) {
					errorHandler(res, error);
				}
			});
		}
	}
}
export default new OrderController();
