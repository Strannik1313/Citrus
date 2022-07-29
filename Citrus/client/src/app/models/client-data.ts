export class ClientDataFirstStepInit {
	service: string = '';
	serviceId: number = -1;
}
export class ClientDataSecondStepInit {
	master: string = '';
	masterId: number = -1;
	date: Date | null = null;
}
export class ClientDataThirdStepInit {
	name: string = '';
	surname: string = '';
	phoneNumber: string = '';
	comments: string = '';
}
export class ClientData
	implements
		ClientDataFirstStepInit,
		ClientDataSecondStepInit,
		ClientDataThirdStepInit
{
	master: string = '';
	masterId: number = -1;
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
