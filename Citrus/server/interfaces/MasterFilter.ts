export interface MasterFilter {
	names?: string;
	servicesIds?: string[];
}

export interface MasterFilterWithId extends MasterFilter {
	id?: string;
}
