import { ServiceReturnType } from '@interfaces/ServiceReturnType';
import { db } from '@config/db';
import { MastersService } from './masters.service';
import { ProcessStatus } from '@enums/ProcessStatus';
import { WeekDto } from '@dto/WeekDto';
import { DatesHelper } from '@helpers/DatesHelper';
import { QueryDocumentSnapshot } from '@google-cloud/firestore';
import { CalendarDto } from '@dto/CalendarDto';
import dayjs from 'dayjs';
import { MonthsDto } from '@dto/MonthsDto';
import { ScheduleDto } from '@dto/ScheduleDto';
dayjs().format();

class CalendarServiceClass {
	async getCalendar(
		serviceId: number,
		masterId: number | undefined,
		startOfWeek: string | undefined,
	): Promise<ServiceReturnType<WeekDto[]>> {
		let week: WeekDto[] = DatesHelper.getWeek(startOfWeek);
		const getMastersResult = await MastersService.getMasters(serviceId);
		switch (getMastersResult.status) {
			case ProcessStatus.ERROR: {
				return getMastersResult;
			}
			case ProcessStatus.SUCCESS: {
				try {
					const datesCollection = db.collection('schedules');
					const dates = await datesCollection
						.where('masterId', 'in', getMastersResult.data)
						.get()
						.then(collection => {
							collection.forEach((snapshot: QueryDocumentSnapshot) => {
								const masterTimes = snapshot.data() as ScheduleDto;
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

	async getSchedule(date: string): Promise<ServiceReturnType<ScheduleDto[]>> {
		let schedule: Array<ScheduleDto> = [];
		const schedulesCollection = db.collection('schedules');
		try {
			await schedulesCollection
				.where('date', '==', date)
				.get()
				.then(collection => {
					collection.forEach(scheduleFromDB => {
						schedule.push({
							masterId: scheduleFromDB.data().masterId,
							freetimes: scheduleFromDB.data().freetimes,
							id: scheduleFromDB.data().id,
							date: scheduleFromDB.data().date,
						});
					});
				});
			return {
				status: ProcessStatus.SUCCESS,
				data: schedule,
			};
		} catch (error) {
			return {
				status: ProcessStatus.ERROR,
				message: 'Не удалось получить расписание',
				cause: error as Error,
			};
		}
	}

	async getMonths(startMonth: string): Promise<ServiceReturnType<MonthsDto>> {
		try {
			let monthsDto: MonthsDto = {
				months: DatesHelper.getHalfOfYears(Number(startMonth)),
			};
			return {
				status: ProcessStatus.SUCCESS,
				data: monthsDto,
			};
		} catch (error) {
			return {
				status: ProcessStatus.ERROR,
				message: 'Не удалось сформировать коллекцию месяцев',
				cause: error as Error,
			};
		}
	}
}

export const CalendarService = new CalendarServiceClass();
