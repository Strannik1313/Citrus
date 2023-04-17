import { ServiceReturnType } from '@interfaces/ServiceReturnType';
import { db } from '@config/db';
import { MastersService } from './masters.service';
import { ProcessStatus } from '@enums/ProcessStatus';
import { WeekDto } from '@dto/WeekDto';
import { DatesHelper } from '@helpers/DatesHelper';
import { QueryDocumentSnapshot } from '@google-cloud/firestore';
import { CalendarDto } from '@dto/CalendarDto';
import { Schedule } from '@interfaces/Schedule';
import dayjs from 'dayjs';

class CalendarServiceClass {
	async getCalendar(serviceId: number, masterId: number | undefined): Promise<ServiceReturnType<WeekDto[]>> {
		let week: WeekDto[] = DatesHelper.getWeek();
		const getMastersResult = await MastersService.getMasters(serviceId);
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
							collection.forEach((snapshot: QueryDocumentSnapshot) => {
								const masterTimes = snapshot.data() as CalendarDto;
								if (masterId === masterTimes.masterId || masterId === null) {
									week = DatesHelper.getWeekDto(week, masterTimes);
								}
							});
							return week.map(day => {
								return {
									date: day.date,
									mastersId: Array.from(new Set(day.mastersId)),
								};
							});
						});
					return {
						status: ProcessStatus.SUCCESS,
						data: dates,
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

	async getSchedule(serviceId: number, date: string): Promise<ServiceReturnType<Schedule[]>> {
		let schedule: Array<Schedule> = [];
		let extraTimeInterval: Array<string> = [];
		const mastersIdArray: Array<number> = [];
		const mastersCollection = db.collection('masters');
		const servicesCollection = db.collection('services');
		const datesCollection = db.collection('calendar');
		try {
			await mastersCollection.get().then(collection => {
				collection.forEach(master => {
					const masterId = master.data().masterId;
					mastersIdArray.push(masterId);
					schedule.push({
						masterId,
						masterName: master.data().name,
						cost: master.data().price[master.data().serviceId.indexOf(serviceId)],
						freetimes: [],
					});
				});
			});
		} catch (error) {
			return {
				status: ProcessStatus.ERROR,
				message: 'Не удалось получить мастеров',
				cause: error as Error,
			};
		}
		try {
			await servicesCollection
				.where('id', '==', serviceId)
				.get()
				.then(collection => {
					collection.forEach(service => {
						for (let i = 0; i <= 120 - service.data().duration; i = i + 10) {
							extraTimeInterval.push(i.toString());
						}
						schedule = schedule.map(order => {
							return {
								...order,
								duration: service.data().duration,
							};
						});
					});
				});
		} catch (error) {
			return {
				status: ProcessStatus.ERROR,
				message: 'Не удалось получить доступные сервисы',
				cause: error as Error,
			};
		}
		try {
			await datesCollection
				.where('masterId', 'in', mastersIdArray)
				.get()
				.then(collection => {
					collection.forEach(masterTimes => {
						for (let i = 0; i < masterTimes.data().freeTimes.length; i++) {
							if (dayjs(date).isSame(masterTimes.data().freeTimes[i].toDate(), 'day')) {
								schedule = schedule.map(order => {
									if (order.masterId === masterTimes.data().masterId) {
										return {
											...order,
											freetimes: [...order.freetimes, masterTimes.data().freeTimes[i].toDate()],
										};
									}
									return order;
								});
							}
						}
					});
					schedule = schedule.filter(order => {
						return order.freetimes.length > 0;
					});
					schedule = schedule.map(order => {
						return {
							...order,
							freetimes: order.freetimes.sort((a, b) => {
								return a - b;
							}),
						};
					});
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					schedule = schedule.map(order => {
						return {
							...order,
							freetimes: order.freetimes.map(time => {
								return extraTimeInterval.map(interval => {
									return dayjs(time).minute(Number(interval)).toString();
								});
							}),
						};
					});
				});
			return {
				status: ProcessStatus.SUCCESS,
				data: schedule,
			};
		} catch (error) {
			return {
				status: ProcessStatus.ERROR,
				message: 'Не удалось получить доступные сервисы',
				cause: error as Error,
			};
		}
	}
}

export const CalendarService = new CalendarServiceClass();
