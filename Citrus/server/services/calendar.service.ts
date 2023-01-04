import { ServiceReturnType } from '../interfaces/ServiceReturnType';
import dayjs from 'dayjs';
import { db } from '../config/db.js';
import { MastersService } from './masters.service.js';
import { ProcessStatus } from '../enums/ProcessStatus.js';
import { WeekDto } from '../interfaces/WeekDto.js';

export class CalendarService {
	async getCalendar(
		serviceId: number,
		masterId: number | undefined,
	): Promise<ServiceReturnType<WeekDto[]>> {
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
		const getMastersResult = await new MastersService().getMasters(serviceId);
		switch (getMastersResult.status) {
			case ProcessStatus.ERROR: {
				return getMastersResult;
			}
			case ProcessStatus.SUCCESS: {
				try {
					const datesCollection = db.collection('calendar');
					const dates = await datesCollection
						.where('masterId', 'in', getMastersResult.data)
						.get()
						.then(collection => {
							collection.forEach(masterTimes => {
								if (
									masterId === masterTimes.data().masterId ||
									masterId === null
								) {
									for (
										let i = 0;
										i < masterTimes.data().freeTimes.length;
										i++
									) {
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
						});
					return {
						status: ProcessStatus.SUCCESS,
						data: week,
					};
				} catch (error) {
					return {
						status: ProcessStatus.ERROR,
						cause: error as Error,
						message: 'Не удалось получить коллекцию дней',
					};
				}
			}
		}
	}
}
