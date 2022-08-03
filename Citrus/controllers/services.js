const db = require('../config/db');
const errorHandler = require('../utils/errorHandler');

module.exports.services = async (req, res) => {
	const servicesArray = db.collection('services');
	await servicesArray.get().then(collection => {
		try {
			const array = [];
			collection.docs.forEach(d => {
				array.push({
					...d.data(),
					title: d.id,
				});
			});
			res.status(200).json(array);
		} catch (error) {
			errorHandler(res, error);
		}
	});
};
