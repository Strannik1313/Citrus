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
		const names = filter.names.split(',');
		result = collection.where('name', 'in', names);
	}
	if (filter.servicesIds) {
		const servicesIds = filter.servicesIds.split(',');
		result = collection.where('serviceId', 'array-contains-any', servicesIds);
	}
	return result;
}

export function getPageableResponse<T>(response: T[], pagination: Pagination): PageableResponse<T> {
	if (!pagination || !pagination.page || !pagination.size) {
		return {
			total: 1,
			current: 1,
			result: response,
		};
	}
	let result: T[] = [];
	const size = pagination.size;
	const page = pagination.page;
	const pages: number = Math.ceil(response.length / size);
	response.forEach((curr, index) => {
		if (Math.ceil((index + 1) / size) === page) {
			result.push(curr);
		}
	});
	return {
		total: pages,
		current: page,
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
