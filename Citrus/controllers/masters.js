import db from '../config/db.js';
import errorHandler from '../utils/errorHandler.js';

class MastersController {
	async masters(req, res) {
		const mastersArray = [];
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
