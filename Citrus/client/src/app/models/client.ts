export interface ChoisenService {
	serviceName: string;
	serviceId: number | null;
}
export interface ChoisenDate {
	masterName: string;
	masterId: number | null;
	dateOrder: string | null;
}
export interface ClientConfirmStep {
	name: string;
	surname: string;
	phoneNumber: string;
	comments?: string;
}
export interface Client {
	masterName: string;
	masterId: number | null;
	serviceName: string;
	serviceId: number | null;
	dateOrder: string | null;
	name: string;
	surname: string;
	phoneNumber: string;
	comments?: string;
}
