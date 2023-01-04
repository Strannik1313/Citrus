import { db } from '../config/db.js';
import { Service } from '../interfaces/Service';
import { Firestore, QueryDocumentSnapshot } from '@google-cloud/firestore';
import { ProcessStatus } from '../enums/ProcessStatus.js';
import { ServiceReturnType } from '../interfaces/ServiceReturnType';

export class ServicesService {
	async getServices(filter?: string): Promise<ServiceReturnType<Service[]>> {
		try {
			const servicesArray = (<Firestore>db).collection('services');
			const services: Service[] = await servicesArray.get().then(collection => {
				let array: Service[] = [];
				collection.docs.forEach((doc: QueryDocumentSnapshot) => {
					let service = doc.data() as Service;
					if (service.description.includes(filter ?? '')) {
						array.push({
							...service,
							title: doc.id,
						});
					}
				});
				return array;
			});
			return {
				status: ProcessStatus.SUCCESS,
				data: services,
			};
		} catch (error) {
			return {
				status: ProcessStatus.ERROR,
				message: 'Error',
				cause: error as Error,
			};
		}
	}
}
