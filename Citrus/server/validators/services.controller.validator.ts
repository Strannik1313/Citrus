import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { ProcessStatus } from '@enums/ProcessStatus';

export async function servicesControllerValidator(req: Request, res: Response, next: NextFunction) {
	const result = await body('filter').optional({ values: 'null' }).isString().run(req);
	if (!result.isEmpty()) {
		return res.status(400).json({
			status: ProcessStatus.ERROR,
			message: 'Bad Request',
			cause: 'Service validation error',
		});
	}
	next();
}
