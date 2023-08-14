import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { ProcessStatus } from '@enums/ProcessStatus';

namespace AuthControllerValidator {
	export async function validateLogin(req: Request, res: Response, next: NextFunction) {
		const emailCheckResult = await body('email').isEmail().run(req);
		const passwordCheckResult = await body('password').isString().run(req);
		if (!emailCheckResult.isEmpty() || !passwordCheckResult.isEmpty()) {
			return res.status(400).json({
				status: ProcessStatus.ERROR,
				message: 'Bad Request',
				cause: 'Login form validation error',
			});
		}
		next();
	}

	export async function validateLogout(req: Request, res: Response, next: NextFunction) {
		const idCheckResult = await body('id').isString().run(req);
		if (!idCheckResult.isEmpty()) {
			return res.status(400).json({
				status: ProcessStatus.ERROR,
				message: 'Bad Request',
				cause: 'Logout validation error',
			});
		}
		next();
	}

	export async function validateRegister(req: Request, res: Response, next: NextFunction) {
		const emailCheckResult = await body('email').isEmail().run(req);
		const passwordCheckResult = await body('password').isString().run(req);
		if (!emailCheckResult.isEmpty() || !passwordCheckResult.isEmpty()) {
			return res.status(400).json({
				status: ProcessStatus.ERROR,
				message: 'Bad Request',
				cause: 'Register form validation error',
			});
		}
		next();
	}
}
export default AuthControllerValidator;
