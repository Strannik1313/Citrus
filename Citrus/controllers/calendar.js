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
							date: masterTimes.data().freeTimes[i].toDate(),
							masterId: [masterTimes.data().masterId],
						});
					}
				});
				dateAndIdArray.sort((a, b) => {
					return a.date - b.date;
				});
				dateAndIdArray.forEach(el => {
					if (
						dayjs(el.date).isBetween(
							dayjs(req.body.dateRangeStart),
							dayjs(req.body.dateRangeEnd),
						)
					) {
						dayArray.push(el);
					}
				});
				const filteredDatesArray = [];
				dayArray.forEach((value, index, array) => {
					if (index !== 0) {
						if (value.date.getDate() === array[index - 1].date.getDate()) {
							filteredDatesArray[index - 1].masterId = [
								...filteredDatesArray[index - 1].masterId,
								...value.masterId,
							];
						}
					} else {
						filteredDatesArray.push(value);
					}
				});
				// TODO сделать формирование массива с датой и массивом мастером, кто в эти даты свободен
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
