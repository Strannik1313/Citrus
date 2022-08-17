export interface Timesheet {
	masterId: number;
	masterName: string;
	cost: number;
	duration: number;
	freetimes: Array<string[]>;
}
