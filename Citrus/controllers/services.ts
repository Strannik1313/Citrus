import db from '../config/db.js';
import errorHandler from '../utils/errorHandler.js';
import { Request, Response } from 'express';
import { Service } from '../interfaces/Service.js';
import { firestore } from 'firebase-admin';
import Firestore = firestore.Firestore;
import DocumentData = firestore.DocumentData;

class ServicesController {
	async services(req: Request, res: Response) {
		let filter = req.body.filter;
		console.log(filter);
		const servicesArray = (<Firestore>db).collection('services');
		await servicesArray.get().then(collection => {
			try {
				const array: Service[] = [];
				collection.docs.forEach((doc: DocumentData) => {
					if (doc.data().description.includes(filter) || !filter) {
						array.push({
							...doc.data(),
							title: doc.id,
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
export default ServicesController;
