import { ServiceReturnType } from '../interfaces/ServiceReturnType.js';
import { db } from '../config/db.js';
import { ProcessStatus } from '../enums/ProcessStatus.js';

class MastersServiceClass {
  async getMasters(serviceId: number): Promise<ServiceReturnType<number[] | void>> {
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
