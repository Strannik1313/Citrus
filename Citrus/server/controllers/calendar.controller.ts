import dayjs from 'dayjs';
import 'dayjs/locale/ru.js';
import { Request, Response } from 'express';
import { CalendarService } from '@services/calendar.service';
import { ProcessStatus } from '@enums/ProcessStatus';

dayjs.locale('ru');

class CalendarController {
	async calendar(req: Request, res: Response) {
		const getCalendarResult = await CalendarService.getCalendar(req.body.serviceId, req.body.masterId, req.body.week);
		switch (getCalendarResult.status) {
			case ProcessStatus.SUCCESS: {
				res.status(200).json(getCalendarResult.data);
				break;
			}
			case ProcessStatus.ERROR: {
				res.status(500).json(getCalendarResult);
				break;
			}
		}
	}

	async schedule(req: Request, res: Response) {
		const getScheduleResult = await CalendarService.getSchedule(req.body.date);
		switch (getScheduleResult.status) {
			case ProcessStatus.SUCCESS: {
				res.status(200).json(getScheduleResult.data);
				break;
			}
			case ProcessStatus.ERROR: {
				res.status(500).json(getScheduleResult);
				break;
			}
		}
	}

	async months(req: Request, res: Response) {
		const getMonthsResult = await CalendarService.getMonths(req.query.currentMonth as string);
		switch (getMonthsResult.status) {
			case ProcessStatus.SUCCESS: {
				res.status(200).json(getMonthsResult.data);
				break;
			}
			case ProcessStatus.ERROR: {
				res.status(500).json(getMonthsResult);
				break;
			}
		}
	}
}

export default new CalendarController();
