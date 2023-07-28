import { FilterUnion } from '@interfaces/FilterUnion';
import { FilterUnionEnum } from '@enums/FilterUnionEnum';
import { MasterFilter, MasterFilterWithId } from '@interfaces/MasterFilter';
import { PageableResponse } from '@interfaces/PageableResponse';
import { Pagination } from '@interfaces/Pagination';
import { CollectionReference, Query } from '@google-cloud/firestore';

export function obtainFilter(type: FilterUnionEnum, filter: FilterUnion | undefined, collection: CollectionReference) {
	let queryCollection: Query | undefined;
	if (!filter) {
		return collection;
	}
	switch (type) {
		case FilterUnionEnum.MasterFilter: {
			queryCollection = obtainMasterFilter(filter, collection);
			break;
		}
	}
	return queryCollection || collection;
}

function obtainMasterFilter(filter: MasterFilter, collection: CollectionReference): Query | undefined {
	let result: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> | undefined;
	if (filter.names) {
		result = collection.where('name', 'in', filter.names);
	}
	if (filter.serviceId) {
		result = collection.where('serviceId', 'array-contains-any', filter.serviceId);
	}
	return result;
}

export function getPageableResponse<T>(response: T[], pagination?: Pagination): PageableResponse<T> {
	if (!pagination) {
		return {
			total: 1,
			current: 1,
			result: response,
		};
	}
	let result: T[] = [];
	const pages: number = Math.ceil(response.length / pagination.size);
	response.forEach((curr, index) => {
		if (Math.ceil((index + 1) / pagination.size) === pagination.page) {
			result.push(curr);
		}
	});
	return {
		total: pages,
		current: pagination.page,
		result: result,
	};
}

export function obtainOrderBy(collection: Query, orderBy: string) {
	let order: string[];
	order = orderBy.split(' ');
	if (!!order[0] && !!order[1]) {
		return collection.orderBy(order[0], order[1] === 'desc' ? 'desc' : undefined);
	}
	return collection;
}

export function obtainMasterFilterWithId(filter: MasterFilterWithId, collection: CollectionReference) {
	const result = obtainFilter(FilterUnionEnum.MasterFilter, filter, collection);
	if (filter.id) return result.where('id', '==', filter.id);
	return result;
}
