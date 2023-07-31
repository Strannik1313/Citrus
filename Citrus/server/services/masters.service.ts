import { ServiceReturnType } from '@interfaces/ServiceReturnType';
import { db } from '@config/db';
import { ProcessStatus } from '@enums/ProcessStatus';
import { MasterFilter, MasterFilterWithId } from '@interfaces/MasterFilter';
import { MasterDto } from '@dto/MasterDto';
import { getPageableResponse, obtainFilter, obtainMasterFilterWithId, obtainOrderBy } from '@helpers/utils';
import * as crypto from 'crypto';
import { FilterUnionEnum } from '@enums/FilterUnionEnum';
import { PageableRequest } from '@interfaces/PageableRequest';
import { PageableResponse } from '@interfaces/PageableResponse';
import { Pagination } from '@interfaces/Pagination';

export namespace MastersService {
	export async function getMasters(
		params: PageableRequest<MasterFilter>,
	): Promise<ServiceReturnType<PageableResponse<MasterDto>>> {
		try {
			const response: MasterDto[] = [];
			const mastersCollection = db.collection('masters');
			const filter: MasterFilter = { servicesIds: params.servicesIds, names: params.names };
			const pagination: Pagination = { size: params.size, page: params.page };
			let queryCollection = obtainFilter(FilterUnionEnum.MasterFilter, filter, mastersCollection);
			if (params.orderBy) {
				queryCollection = obtainOrderBy(queryCollection, params.orderBy);
			}
			const masters = await queryCollection.get();
			masters.forEach(master => {
				response.push({
					name: master.data().name,
					id: master.data().id,
					servicesIds: master.data().serviceId,
					prices: master.data().price,
				});
			});
			return {
				status: ProcessStatus.SUCCESS,
				data: getPageableResponse<MasterDto>(response, pagination),
			};
		} catch (error) {
			return {
				status: ProcessStatus.ERROR,
				cause: error as Error,
				message: 'Не удалось получить коллекцию мастеров',
			};
		}
	}

	export async function getMastersById(id: string): Promise<ServiceReturnType<MasterDto>> {
		try {
			let mastersDto: MasterDto | undefined = undefined;
			const mastersCollection = db.collection('masters');
			const snapshot = await mastersCollection.where('id', '==', id).get();
			if (snapshot.empty) {
				return {
					status: ProcessStatus.SUCCESS,
					data: undefined,
				};
			}
			snapshot.forEach(master => {
				mastersDto = master.data() as MasterDto;
			});
			return {
				status: ProcessStatus.SUCCESS,
				data: mastersDto,
			};
		} catch (error) {
			return {
				status: ProcessStatus.ERROR,
				cause: error as Error,
				message: 'Не удалось получить мастера',
			};
		}
	}

	export async function updateMaster(master: MasterDto): Promise<ServiceReturnType<undefined>> {
		try {
			const mastersRef = db.collection('masters').doc(master.id);
			await mastersRef.update({
				...(master.name && { name: master.name }),
				...(master.prices && { price: master.prices }),
				...(master.servicesIds && { serviceId: master.servicesIds }),
			});
			return {
				status: ProcessStatus.SUCCESS,
				data: undefined,
			};
		} catch (error) {
			return {
				status: ProcessStatus.ERROR,
				cause: error as Error,
				message: 'Не удалось обновить мастера',
			};
		}
	}

	export async function createMaster(master: MasterDto): Promise<ServiceReturnType<undefined>> {
		try {
			const id = crypto.randomUUID();
			const mastersRef = db.collection('masters').doc(id);
			await mastersRef.set({
				name: master.name,
				price: master.prices,
				serviceId: master.servicesIds,
				id,
			});
			return {
				status: ProcessStatus.SUCCESS,
				data: undefined,
			};
		} catch (error) {
			return {
				status: ProcessStatus.ERROR,
				cause: error as Error,
				message: 'Не удалось создать мастера',
			};
		}
	}

	export async function deleteMaster(id: string): Promise<ServiceReturnType<undefined>> {
		try {
			const mastersRef = db.collection('masters').doc(id);
			await mastersRef.delete();
			return {
				status: ProcessStatus.SUCCESS,
				data: undefined,
			};
		} catch (error) {
			return {
				status: ProcessStatus.ERROR,
				cause: error as Error,
				message: 'Не удалось удалить мастера',
			};
		}
	}

	export async function getMastersByIdWithFilter(params: MasterFilterWithId): Promise<ServiceReturnType<MasterDto[]>> {
		try {
			const response: MasterDto[] = [];
			const mastersCollection = db.collection('masters');
			let queryCollection = obtainMasterFilterWithId(params, mastersCollection);
			const masters = await queryCollection.get();
			masters.forEach(master => {
				response.push({
					name: master.data().name,
					id: master.data().id,
					servicesIds: master.data().serviceId,
					prices: master.data().price,
				});
			});
			return {
				status: ProcessStatus.SUCCESS,
				data: response,
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

export default MastersService;
