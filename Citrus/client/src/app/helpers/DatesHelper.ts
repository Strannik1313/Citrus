import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);

export class DatesHelper {
	static getNextWeekNumber(day?: string): string {
		let currentWeek = dayjs(day).week();
		return dayjs(day)
			.week(currentWeek + 1)
			.startOf('week')
			.toString();
	}

	static getPrevWeekNumber(day?: string): string {
		let currentWeek = dayjs(day).week();
		return dayjs(day)
			.week(currentWeek - 1)
			.startOf('week')
			.toString();
	}
}
