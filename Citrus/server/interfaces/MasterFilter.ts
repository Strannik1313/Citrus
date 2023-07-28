export interface MasterFilter {
	names?: string[];
	serviceId?: string[];
}

export interface MasterFilterWithId extends MasterFilter {
	id?: string;
}
