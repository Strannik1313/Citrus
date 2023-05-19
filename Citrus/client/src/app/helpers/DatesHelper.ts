import dayjs from 'dayjs';

export class DatesHelper {
	static getStartOfMonth(date: string): string {
		return dayjs(date).startOf('month').toString();
	}
}
