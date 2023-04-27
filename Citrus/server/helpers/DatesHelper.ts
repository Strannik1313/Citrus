import dayjs from 'dayjs';
import { WeekDto } from '@dto/WeekDto';
import { CalendarDto } from '@dto/CalendarDto';

export class DatesHelper {
	static getWeek(): WeekDto[] {
		let week: WeekDto[] = [];
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
		return week;
	}

	static getWeekDto(week: WeekDto[], masterTimes: CalendarDto): WeekDto[] {
		let weekDto: WeekDto[] = week;
		for (let i = 0; i < masterTimes.freeTimes.length; i++) {
			weekDto = week.map(day => {
				if (dayjs(day.date).isSame(masterTimes.freeTimes[i].toDate(), 'day')) {
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
					.toString(),
			);
		}
		return months;
	}
}
