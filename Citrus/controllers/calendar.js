const db = require('../config/db');
const errorHandler = require('../utils/errorHandler');
const dayjs = require('dayjs');
dayjs().format();
let dayOfYear = require('dayjs/plugin/dayOfYear');
dayjs.extend(dayOfYear);

module.exports.calendar = async (req, res) => {
	const mastersIdArray = [];
	const mastersArray = [];
	const dateAndIdArray = [];
	const freeTimesArray = [];
	const mastersCollection = db.collection('masters');
	const datesCollection = db.collection('calendar');
	await mastersCollection
		.where('serviceId', 'array-contains', req.body.serviceId)
		.get()
		.then(collection => {
			try {
				collection.forEach(master => {
					if (
						req.body.masterId === master.data().masterId ||
						req.body.masterId === -1
					) {
						mastersIdArray.push(master.data().masterId);
						mastersArray.push({ ...master.data(), masterId: master.id });
					}
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
				let firstDay = dayjs(req.body.date).isBefore(dateAndIdArray[0].date)
					? dateAndIdArray[0].date
					: req.body.date;
				dateAndIdArray.forEach(date => {
					if (dayjs(firstDay).dayOfYear() === dayjs(date.date).dayOfYear()) {
						freeTimesArray.push(date);
					}
				});
				const arrayWithDates = dateAndIdArray.map(value => value.date);
				const filteredDatesArray = arrayWithDates.filter(
					(value, index, array) => {
						if (index !== 0) {
							return value.getDate() !== array[index - 1].getDate();
						}
						return true;
					},
				);
				res.status(200).json([...filteredDatesArray.slice(0, 7)]);
			} catch (error) {
				errorHandler(res, error);
			}
		});
};

module.exports.mastercard = async (req, res) => {
	const mastersIdArray = [];
	const mastersArray = [];
	const dateAndIdArray = [];
	const freeTimesArray = [];
	const mastersCollection = db.collection('masters');
	const datesCollection = db.collection('calendar');
	await mastersCollection
		.where('serviceId', 'array-contains', req.body.serviceId)
		.get()
		.then(collection => {
			try {
				collection.forEach(master => {
					if (
						req.body.masterId === master.data().masterId ||
						req.body.masterId === -1
					) {
						mastersIdArray.push(master.data().masterId);
						mastersArray.push(master.data());
					}
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
				let firstDay = dayjs(req.body.date).isBefore(dateAndIdArray[0].date)
					? dateAndIdArray[0].date
					: req.body.date;
				dateAndIdArray.forEach(date => {
					if (dayjs(firstDay).dayOfYear() === dayjs(date.date).dayOfYear()) {
						freeTimesArray.push(date);
					}
				});
				let masterCard = mastersArray.map(master => {
					let temp = [];
					temp.push(
						...freeTimesArray
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
				res.status(200).json([...masterCard]);
			} catch (error) {
				errorHandler(res, error);
			}
		});
};
