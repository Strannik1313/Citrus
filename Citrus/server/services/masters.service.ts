import { ServiceReturnType } from '@interfaces/ServiceReturnType';
import { db } from '@config/db';
import { ProcessStatus } from '@enums/ProcessStatus';

class MastersServiceClass {
	async getMasters(serviceId: number): Promise<ServiceReturnType<number[]>> {
		try {
			const mastersCollection = db.collection('masters');
			const mastersIdsArray = await mastersCollection
				.where('serviceId', 'array-contains', serviceId)
				.get()
				.then(collection => {
					let array: Array<number> = [];
					collection.forEach(master => {
						array.push(master.data().masterId);
					});
					return array;
				});
			return {
				status: ProcessStatus.SUCCESS,
				data: mastersIdsArray,
			};
		} catch (error) {
			return {
				status: ProcessStatus.ERROR,
				cause: error as Error,
				message: 'Не удалось получить коллекцию мастеров',
			};
		}
	}
}

export const MastersService = new MastersServiceClass();
