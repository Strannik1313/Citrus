import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { ProcessStatus } from '@enums/ProcessStatus';

export async function calendarControllerValidator(req: Request, res: Response, next: NextFunction) {
	const serviceIdCheckResult = await body('serviceId').isString().run(req);
	const masterIdCheckResult = await body('masterId').optional({ values: 'null' }).isString().run(req);
	const startOfWeekCheckResult = await body('week').optional().isISO8601().run(req);
	if (!serviceIdCheckResult.isEmpty() || !masterIdCheckResult.isEmpty() || !startOfWeekCheckResult.isEmpty()) {
		return res.status(400).json({
			status: ProcessStatus.ERROR,
			message: 'Bad Request',
			cause: 'Calendar validation error',
		});
	}
	next();
}
