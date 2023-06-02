export interface ScheduleDto {
	masterId: number;
	masterName: string;
	cost: number;
	duration: number;
	freetimes: Array<string[]>;
	orders: string[];
	preOrder: string;
	id: string;
}
