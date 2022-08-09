const db = require('../config/db');
const errorHandler = require('../utils/errorHandler');
const dayjs = require('dayjs');
dayjs().format();
let dayOfYear = require('dayjs/plugin/dayOfYear');
dayjs.extend(dayOfYear);
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

module.exports.calendar = async (req, res) => {
	const mastersIdArray = [];
	const dateAndIdArray = [];
	const dayArray = [];
	const mastersCollection = db.collection('masters');
	const datesCollection = db.collection('calendar');
	await mastersCollection
		.where('serviceId', 'array-contains', req.body.serviceId)
		.get()
		.then(collection => {
			try {
				collection.forEach(master => {
					mastersIdArray.push(master.data().masterId);
				});
			} catch (error) {
				errorHandler(res, error);
			}
		});
	await datesCollection
		.where('masterId', 'in', mastersIdArray)
		.get()
		.then(collection => {
			try {
				collection.forEach(masterTimes => {
					for (let i = 0; i < masterTimes.data().freeTimes.length; i++) {
						dateAndIdArray.push({
							masterId: masterTimes.data().masterId,
							date: masterTimes.data().freeTimes[i].toDate(),
						});
					}
				});
				dateAndIdArray.sort((a, b) => {
					return a.date - b.date;
				});
				dateAndIdArray.forEach(value => {
					if (
						dayjs(value.date).isBetween(
							dayjs(req.body.dateRangeStart),
							dayjs(req.body.dateRangeEnd),
						)
					) {
						dayArray.push(value);
					}
				});
				let masters = [];
				const dates = [];
				dayArray.forEach((value, index, array) => {
					if (index !== 0) {
						if (value.date.getDate() === array[index - 1].date.getDate()) {
							masters.push(value.masterId);
						} else {
							dates.push({
								date: array[index - 1].date,
								mastersId: [...masters],
							});
							masters = [value.masterId];
						}
					} else {
						masters.push(value.masterId);
					}
					if (index === array.length - 1) {
						dates.push({
							date: value.date,
							mastersId: [...masters],
						});
					}
				});
				const filteredDatesArray = dates.map(value => {
					return {
						date: value.date,
						mastersId: Array.from(new Set(value.mastersId)),
					};
				});
				res.status(200).json(filteredDatesArray);
			} catch (error) {
				errorHandler(res, error);
			}
		});
};

module.exports.orders = async (req, res) => {
	let orders = [];
	const mastersIdArray = [];
	const mastersCollection = db.collection('masters');
	const servicesCollection = db.collection('services');
	const datesCollection = db.collection('calendar');
	await mastersCollection.get().then(collection => {
		try {
			collection.forEach(master => {
				const masterId = master.data().masterId;
				if (req.body.masterId === null || req.body.masterId === masterId) {
					mastersIdArray.push(masterId);
					orders.push({
						masterId,
						masterName: master.data().name,
						cost: master.data().price[
							master.data().serviceId.indexOf(req.body.serviceId)
						],
						freetimes: [],
					});
				}
			});
		} catch (error) {
			errorHandler(res, error);
		}
	});
	await servicesCollection
		.where('id', '==', req.body.serviceId)
		.get()
		.then(collection => {
			try {
				collection.forEach(service => {
					orders = orders.map(order => {
						return {
							...order,
							duration: service.data().duration,
						};
					});
				});
			} catch (error) {
				errorHandler(res, error);
			}
		});
	await datesCollection
		.where('masterId', 'in', mastersIdArray)
		.get()
		.then(collection => {
			try {
				collection.forEach(masterTimes => {
					for (let i = 0; i < masterTimes.data().freeTimes.length; i++) {
						if (
							dayjs(req.body.date).dayOfYear() ===
							dayjs(masterTimes.data().freeTimes[i].toDate()).dayOfYear()
						) {
							orders = orders.map(order => {
								if (order.masterId === masterTimes.data().masterId) {
									return {
										...order,
										freetimes: [
											...order.freetimes,
											masterTimes.data().freeTimes[i].toDate(),
										],
									};
								}
								return order;
							});
						}
					}
				});
				orders = orders.map(order => {
					if (order.freetimes.length > 0) {
						return {
							...order,
							freetimes: order.freetimes.sort((a, b) => {
								return a - b;
							}),
						};
					}
					return order;
				});
				res.status(200).json(orders);
			} catch (error) {
				errorHandler(res, error);
			}
		});
};
