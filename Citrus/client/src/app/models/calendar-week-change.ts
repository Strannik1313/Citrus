import { Dayjs } from 'dayjs';

export interface CalendarWeekChange {
	startDay: Dayjs;
	endDay: Dayjs;
	today: Dayjs;
}
