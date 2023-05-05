import { MasterDto } from '@models/MasterDto';
import { ServiceDto } from '@models/ServiceDto';
import { Client } from '@models/client';

export interface Order {
	master: MasterDto;
	service: ServiceDto;
	date: Date;
	client: Client | null;
	comments: string | null;
}
