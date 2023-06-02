import { ScheduleDto } from '@models/ScheduleDto';

export interface Schedule extends ScheduleDto {
	masterName: string;
	cost: number;
	duration: number;
	orders?: string[];
	preOrder?: string;
}
