import dayjs from 'dayjs';
import { WeekDto } from '@dto/WeekDto';
import { ScheduleDto } from '@dto/ScheduleDto';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class DatesHelper {
	static getWeek(startOfWeek?: string): WeekDto[] {
		let week: WeekDto[] = [];
		let startDay = dayjs(startOfWeek).startOf('week');
		for (let i = 0; i <= 6; i++) {
			week.push({
				date: startDay.add(i, 'day').toDate(),
				mastersId: [],
			});
		}
		return week;
	}

	static getWeekDto(week: WeekDto[], masterTimes: ScheduleDto): WeekDto[] {
		let weekDto: WeekDto[] = week;
		for (let i = 0; i < masterTimes.freetimes.length; i++) {
			weekDto = week.map(day => {
				if (dayjs(day.date).isSame(masterTimes.freetimes[i], 'day')) {
					return {
						...day,
						mastersId: [...day.mastersId, masterTimes.masterId],
					};
				}
				return day;
			});
		}
		return weekDto;
	}

	static getHalfOfYears(startMonth: number): string[] {
		let months = [];
		for (let i = 0; i < 7; i++) {
			months.push(
				dayjs()
					.month(i + startMonth)
					.startOf('month')
					.utc()
					.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
			);
		}
		return months;
	}
}
