const db = require('../config/db');
const errorHandler = require('../utils/errorHandler');
const dayjs = require('dayjs');
dayjs().format();
let dayOfYear = require('dayjs/plugin/dayOfYear');
dayjs.extend(dayOfYear);
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);

module.exports.calendar = async (req, res) => {
	const mastersIdArray = [];
	const dateArray = [];
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
						dateArray.push(masterTimes.data().freeTimes[i].toDate());
					}
				});
				dateArray.sort((a, b) => {
					return a - b;
				});
				dateArray.forEach(date => {
					if (dayjs(date).isSameOrAfter(req.body.date)) {
						dayArray.push(date);
					}
				});
				const filteredDatesArray = dayArray.filter((value, index, array) => {
					if (index !== 0) {
						return value.getDate() !== array[index - 1].getDate();
					}
					return true;
				});
				res.status(200).json(filteredDatesArray.slice(0, req.body.range));
			} catch (error) {
				errorHandler(res, error);
			}
		});
};

module.exports.orders = async (req, res) => {
	const mastersIdArray = [];
	const mastersArray = [];
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
					mastersArray.push(master.data());
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
							masterId: masterTimes.data().masterId,
						});
					}
				});
				dateAndIdArray.sort((a, b) => {
					return a.date - b.date;
				});
				let firstDay;
				req.body.date
					? (firstDay = req.body.date)
					: (firstDay = dateAndIdArray[0].date);
				dateAndIdArray.forEach(date => {
					if (dayjs(firstDay).dayOfYear() === dayjs(date.date).dayOfYear()) {
						dayArray.push(date);
					}
				});
				let masterCard = mastersArray.map(master => {
					let temp = [];
					temp.push(
						...dayArray
							.map(value => {
								if (value.masterId === master.masterId) {
									return value.date;
								}
								return;
							})
							.filter(value => {
								return value !== undefined;
							}),
					);
					return { ...master, dates: [...temp] };
				});
				res.status(200).json(masterCard);
			} catch (error) {
				errorHandler(res, error);
			}
		});
};
