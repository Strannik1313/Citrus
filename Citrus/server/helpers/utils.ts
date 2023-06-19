import { MasterFilter } from '@interfaces/MasterFilter';

export function obtainFilter(
	filter: MasterFilter,
	collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
) {
	let queryCollection: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> | undefined;
	for (const filterElement in filter) {
		if (filter[filterElement] === undefined || filter[filterElement] === null) continue;
		if (!queryCollection) {
			queryCollection = collection.where(
				filterElement,
				Array.isArray(filter[filterElement]) ? 'array-contains-any' : '==',
				filter[filterElement],
			);
			continue;
		}
		queryCollection = queryCollection.where(
			filterElement,
			Array.isArray(filter[filterElement]) ? 'array-contains-any' : '==',
			filter[filterElement],
		);
	}
	return queryCollection || collection;
}
