import { db } from '../config/db.js';
import { errorHandler } from '../utils/errorHandler.js';
import dayjs from 'dayjs';
import 'dayjs/locale/ru.js';
import { Request, Response } from 'express';
dayjs.locale('ru');

class CalendarController {
	async calendar(req: Request, res: Response) {
		const mastersIdArray: Array<number> = [];
		let week: Array<{ date: Date; mastersId: Array<number> }> = [];
		let startDay = dayjs().startOf('week');
		if (startDay.isBefore(dayjs().startOf('day'))) {
			startDay = dayjs().startOf('week');
		}
		for (let i = 0; i <= 6; i++) {
			week.push({
				date: startDay.add(i, 'day').toDate(),
				mastersId: [],
			});
		}
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
						if (
							req.body.masterId === masterTimes.data().masterId ||
							req.body.masterId === null
						) {
							for (let i = 0; i < masterTimes.data().freeTimes.length; i++) {
								week = week.map(day => {
									if (
										dayjs(day.date).isSame(
											masterTimes.data().freeTimes[i].toDate(),
											'day',
										)
									) {
										return {
											...day,
											mastersId: [
												...day.mastersId,
												masterTimes.data().masterId,
											],
										};
									}
									return day;
								});
							}
						}
					});
					week = week.map(day => {
						return {
							date: day.date,
							mastersId: Array.from(new Set(day.mastersId)),
						};
					});
					res.status(200).json(week);
				} catch (error) {
					errorHandler(res, error);
				}
			});
	}

	async timesheets(req: Request, res: Response) {
		let timesheets: Array<{
			masterId: number;
			masterName: string;
			cost: number;
			freetimes: Array<number>;
		}> = [];
		let extraTimeInterval: Array<string> = [];
		const mastersIdArray: Array<number> = [];
		const mastersCollection = db.collection('masters');
		const servicesCollection = db.collection('services');
		const datesCollection = db.collection('calendar');
		await mastersCollection.get().then(collection => {
			try {
				collection.forEach(master => {
					const masterId = master.data().masterId;
					if (req.body.masterId === null || req.body.masterId === masterId) {
						mastersIdArray.push(masterId);
						timesheets.push({
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
						for (let i = 0; i <= 120 - service.data().duration; i = i + 10) {
							extraTimeInterval.push(i.toString());
						}
						timesheets = timesheets.map(order => {
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
								dayjs(req.body.date).isSame(
									masterTimes.data().freeTimes[i].toDate(),
									'day',
								)
							) {
								timesheets = timesheets.map(order => {
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
					timesheets = timesheets.filter(order => {
						return order.freetimes.length > 0;
					});
					timesheets = timesheets.map(order => {
						return {
							...order,
							freetimes: order.freetimes.sort((a, b) => {
								return a - b;
							}),
						};
					});
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					timesheets = timesheets.map(order => {
						return {
							...order,
							freetimes: order.freetimes.map(time => {
								return extraTimeInterval.map(interval => {
									return dayjs(time).minute(Number(interval)).toString();
								});
							}),
						};
					});
					res.status(200).json(timesheets);
				} catch (error) {
					errorHandler(res, error);
				}
			});
	}
}
export default new CalendarController();
