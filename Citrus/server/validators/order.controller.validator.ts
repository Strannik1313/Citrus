import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { ProcessStatus } from '@enums/ProcessStatus';

export async function orderControllerValidator(req: Request, res: Response, next: NextFunction) {
	const nameResult = await body('name').isString().run(req);
	const surnameResult = await body('surname').isString().run(req);
	const phoneNumberResult = await body('phoneNumber').isString().isInt().run(req);
	const emailResult = await body('email').optional().isString().run(req);
	const commentsResult = await body('comments').optional().isString().run(req);
	if (
		!nameResult.isEmpty() ||
		!surnameResult.isEmpty() ||
		!phoneNumberResult.isEmpty() ||
		!emailResult.isEmpty() ||
		!commentsResult.isEmpty()
	) {
		return res.status(400).json({
			status: ProcessStatus.ERROR,
			message: 'Bad Request',
			cause: 'Order validation error',
		});
	}
	next();
}
