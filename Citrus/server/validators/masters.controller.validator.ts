import { NextFunction, Request, Response } from 'express';
import { body, param, query } from 'express-validator';
import { ProcessStatus } from '@enums/ProcessStatus';

namespace MastersControllerValidator {
	export async function validateMasters(req: Request, res: Response, next: NextFunction) {
		const filterNamesValuesCheck = await query('names').optional().isString().run(req);
		const filterServiceCheck = await query('servicesIds').optional().isString().run(req);
		const orderCheck = await query('orderBy')
			.optional()
			.isString()
			.matches(/name (?=asc\b|desc\b)/)
			.run(req);
		const paginationSizeCheck = await query('size').optional().not().isString().isInt({ min: 1 }).run(req);
		const paginationPageCheck = await query('page').optional().not().isString().isInt({ min: 1 }).run(req);
		if (
			!filterNamesValuesCheck.isEmpty() ||
			!filterServiceCheck.isEmpty() ||
			!orderCheck.isEmpty() ||
			!paginationSizeCheck.isEmpty() ||
			!paginationPageCheck.isEmpty()
		) {
			return res.status(400).json({
				status: ProcessStatus.ERROR,
				message: 'Bad Request',
				cause: 'Masters validation error',
			});
		}
		next();
	}

	export async function validateMasterById(req: Request, res: Response, next: NextFunction) {
		const masterIdCheckResult = await param('id').isString().run(req);
		if (!masterIdCheckResult.isEmpty()) {
			return res.status(400).json({
				status: ProcessStatus.ERROR,
				message: 'Bad Request',
				cause: 'Masters validation error',
			});
		}
		next();
	}

	export async function validateUpdateMaster(req: Request, res: Response, next: NextFunction) {
		const idCheckResult = await body('id').isString().run(req);
		const nameCheckResult = await body('name').optional().isString().run(req);
		const pricesArrayCheckResult = await body('prices').optional().isArray().run(req);
		const pricesArrayValuesCheckResult = await body('prices.*').optional().not().isString().isInt().run(req);
		const servicesArrayCheckResult = await body('servicesIds').optional().isArray().run(req);
		const servicesArrayValuesCheckResult = await body('servicesIds.*').optional().isString().run(req);
		if (
			!idCheckResult.isEmpty() ||
			!nameCheckResult.isEmpty() ||
			!pricesArrayCheckResult.isEmpty() ||
			!pricesArrayValuesCheckResult.isEmpty() ||
			!servicesArrayCheckResult.isEmpty() ||
			!servicesArrayValuesCheckResult.isEmpty()
		) {
			return res.status(400).json({
				status: ProcessStatus.ERROR,
				message: 'Bad Request',
				cause: 'Masters validation error',
			});
		}
		next();
	}

	export async function validateCreateMaster(req: Request, res: Response, next: NextFunction) {
		const nameCheckResult = await body('name').isString().run(req);
		const pricesArrayCheckResult = await body('prices').isArray().run(req);
		const pricesArrayValuesCheckResult = await body('prices.*').not().isString().isInt().run(req);
		const servicesArrayCheckResult = await body('servicesIds').isArray().run(req);
		const servicesArrayValuesCheckResult = await body('servicesIds.*').isString().run(req);
		if (
			!nameCheckResult.isEmpty() ||
			!pricesArrayCheckResult.isEmpty() ||
			!pricesArrayValuesCheckResult.isEmpty() ||
			!servicesArrayCheckResult.isEmpty() ||
			!servicesArrayValuesCheckResult.isEmpty()
		) {
			return res.status(400).json({
				status: ProcessStatus.ERROR,
				message: 'Bad Request',
				cause: 'Masters validation error',
			});
		}
		next();
	}

	export async function validateDeleteMaster(req: Request, res: Response, next: NextFunction) {
		const idCheckResult = await body('id').isString().run(req);
		if (!idCheckResult.isEmpty()) {
			return res.status(400).json({
				status: ProcessStatus.ERROR,
				message: 'Bad Request',
				cause: 'Masters validation error',
			});
		}
		next();
	}
}
export default MastersControllerValidator;
