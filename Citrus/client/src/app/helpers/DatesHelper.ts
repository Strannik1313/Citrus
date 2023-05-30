import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore);

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
	static getStartOfMonth(date: string): string {
		return dayjs(date).startOf('month').toString();
	}

	static isPrevWeekInPast(date: string): boolean {
		return dayjs(date).isSameOrBefore(dayjs());
	}
}
