const dayjs = require('dayjs');
const db = require('../config/db');
const errorHandler = require('../utils/errorHandler');

module.exports.order = async (req, res, next) => {
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
							if (
								dayjs(time.toDate()).isSame(req.body.dateOrder, 'day') &&
								dayjs(time.toDate()).isSame(req.body.dateOrder, 'hour')
							) {
								return true;
							}
							dateArray.push(time.toDate());
							return false;
						}).length !== 0
					) {
						dateExist = true;
						dateDocId = timesheet.id;
					} else {
						dateExist = false;
						res.status(404).json({
							windowHeaderText: 'Ошибка',
							windowText: 'Данное время уже занято',
							buttonLabel: 'Ok',
							customMessage: 'Попробуйте заново',
							type: 'error',
						});
						throw new Error();
					}
				});
			} catch (error) {
				errorHandler(error, req, res, next);
			}
			try {
				calendarCollection.doc(dateDocId).update({
					freeTimes: dateArray,
				});
			} catch (error) {
				errorHandler(error, req, res, next);
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

				res.status(200).json({
					windowHeaderText: 'Ваша запись успешно оформлена',
					windowText: '',
					buttonLabel: 'Ok',
					customMessage: `Вы записаны к мастеру ${req.body.masterName}, ${dayjs(
						req.body.dateOrder,
					)
						.format('DD MMMM')
						.toString()} в ${dayjs(req.body.dateOrder)
						.format('HH:mm')
						.toString()}, на процедуру ${req.body.serviceName}`,
					type: 'confirm',
				});
			} catch (error) {
				errorHandler(error, req, res, next);
			}
		});
	}
};
