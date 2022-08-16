import { MAX_SERVICE_DURATION } from '@constants/max-service-duration';
import { BtnStatus, CALENDAR_BTN_INIT_VALUE } from '@models/buttons-status';
import { Timesheet } from '@models/timesheet';
import dayjs from 'dayjs';

export class WizardHelper {
	static getCalendarBtnConf(startDay: string, month: string | null): BtnStatus {
		return {
			...CALENDAR_BTN_INIT_VALUE,
			...(dayjs(startDay).isBefore(dayjs(), 'day') && { prev: true }),
			...(dayjs(startDay).isBefore(month, 'month') && { prev: true }),
			...(dayjs(startDay).endOf('week').isAfter(month, 'month') && {
				next: true,
			}),
		};
	}
	static getExtraTimeInterval(timesheets: Array<Timesheet>): Array<string> {
		const extraTimeInterval = [];
		if (timesheets.length > 0) {
			for (
				let i = 0;
				i <= MAX_SERVICE_DURATION - timesheets[0].duration;
				i = i + 10
			) {
				extraTimeInterval.push(
					i.toString().length === 1 ? i.toString() + '0' : i.toString(),
				);
			}
		}
		return extraTimeInterval;
	}
	static getMonth(): Array<string> {
		const month = [];
		for (let i = 0; i < 6; i++) {
			month.push(dayjs().startOf('month').add(i, 'month').toString());
		}
		return month;
	}
}
