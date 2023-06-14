import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { ProcessStatus } from '@enums/ProcessStatus';

export async function mastersControllerValidator(req: Request, res: Response, next: NextFunction) {
	const serviceIdCheckResult = await body('serviceId').not().isString().isInt().run(req);
	const masterIdCheckResult = await body('masterId').optional({ values: 'null' }).not().isString().isInt().run(req);
	if (!serviceIdCheckResult.isEmpty() || !masterIdCheckResult.isEmpty()) {
		return res.status(400).json({
			status: ProcessStatus.ERROR,
			message: 'Bad Request',
			cause: 'Calendar validation error',
		});
	}
	next();
}
