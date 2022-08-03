const db = require('../config/db');
const errorHandler = require('../utils/errorHandler');

module.exports.masters = async (req, res) => {
	const mastersArray = [];
	const mastersCollection = db.collection('masters');
	await mastersCollection
		.where('serviceId', 'array-contains', req.body.serviceId)
		.get()
		.then(collection => {
			try {
				collection.forEach(master => {
					mastersArray.push({ ...master.data() });
				});
				res.status(200).json([...mastersArray]);
			} catch (error) {
				errorHandler(res, error);
			}
		});
};
