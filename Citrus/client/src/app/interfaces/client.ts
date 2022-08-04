export interface ChoisenService {
	serviceName: string;
	serviceId: number | null;
}
export interface ChoisenDate {
	masterName: string;
	masterId: number | null;
	dateOrder: Date | null;
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
	dateOrder: Date | null;
	name: string;
	surname: string;
	phoneNumber: string;
	comments?: string;
}
