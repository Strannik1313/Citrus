import { db } from '../config/db.js';
import { errorHandler } from '../utils/errorHandler.js';
import { Request, Response } from 'express';

class MastersController {
	async masters(req: Request, res: Response) {
		const mastersArray: Array<{ name: string; id: number }> = [];
		const mastersCollection = db.collection('masters');
		if (req.body.serviceId !== null) {
			await mastersCollection
				.where('serviceId', 'array-contains', req.body.serviceId)
				.get()
				.then(collection => {
					try {
						collection.forEach(master => {
							mastersArray.push({
								name: master.data().name,
								id: master.data().masterId,
							});
						});
						res.status(200).json(mastersArray);
					} catch (error) {
						errorHandler(res, error);
					}
				});
		}
	}
}
export default new MastersController();
