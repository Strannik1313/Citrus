import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import utc from 'dayjs/plugin/utc';
import { DateFormat } from '@constants/DateFormat';

dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

export class DatesHelper {
	static getNextWeekNumber(day?: string): string {
		let currentWeek = dayjs(day).week();
		return dayjs(day)
			.week(currentWeek + 1)
			.startOf('week')
			.utc()
			.format(DateFormat);
	}

	static getPrevWeekNumber(day?: string): string {
		let currentWeek = dayjs(day).week();
		return dayjs(day)
			.week(currentWeek - 1)
			.startOf('week')
			.utc()
			.format(DateFormat);
	}

	static getStartOfMonth(date: string): string {
		return dayjs(date).startOf('month').utc().format(DateFormat);
	}

	static isPrevWeekInPast(date: string): boolean {
		return dayjs(date).isSameOrBefore(dayjs());
	}

	static getFreeTimesWithShifts(freeTimes: string[], procedureDuration: number): Array<string[]> {
		return freeTimes.map(time => {
			let shifts = [];
			for (let i = 0; i <= procedureDuration; i += 10) {
				shifts.push(dayjs(time).minute(i).utc().format(DateFormat));
			}
			return shifts;
		});
	}
}
