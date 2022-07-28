export class ClientData {
	master: string = '';
	masterId: number = 0;
	service: string = '';
	serviceId: number = -1;
	date: Date | null = null;
	time: {
		hour: number;
		minute: number;
	} = {
		hour: 0,
		minute: 0,
	};
	name: string = '';
	surname: string = '';
	phoneNumber: string = '';
	comments: string = '';
}
