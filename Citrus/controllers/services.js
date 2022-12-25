import db from '../config/db.js';
import errorHandler from '../utils/errorHandler.js';

class ServicesController {
	async services(req, res) {
		let filter = req.body.filter;
		console.log(filter);
		const servicesArray = db.collection('services');
		await servicesArray.get().then(collection => {
			try {
				const array = [];
				collection.docs.forEach(d => {
					if (d.data().description.includes(filter) || !filter) {
						array.push({
							...d.data(),
							title: d.id,
						});
					}
				});
				res.status(200).json(array);
			} catch (error) {
				errorHandler(res, error);
			}
		});
	}
}
export default new ServicesController();
