import { Response } from 'express';

export function errorHandler(res: Response | null, error: unknown) {
	if (res) {
		res.status(500).json({
			success: false,
			message: (<Error>error).message ?? error,
		});
	}
}
