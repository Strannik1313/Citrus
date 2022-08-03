export interface ChoisenService {
	serviceName: string;
	serviceId: number;
}
export interface ChoisenDate {
	master: string;
	masterId: number;
	dateOrder: Date | null;
}
export interface ClientConfirmStep {
	name: string;
	surname: string;
	phoneNumber: string;
	comments: string;
}
export interface Client {
	masterName: string;
	masterId: number;
	serviceName: string;
	serviceId: number;
	dateOrder: Date | null;
	name: string;
	surname: string;
	phoneNumber: string;
	comments?: string;
}
