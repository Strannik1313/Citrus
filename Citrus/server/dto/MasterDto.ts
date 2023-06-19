export interface MasterDto {
	id: string;
	name: string;
	servicesIds: string[];
	prices: Array<{ serviceId: string; price: number }>;
}
