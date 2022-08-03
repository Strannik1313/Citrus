import { MasterData } from '@models/master-data';

export interface MasterCard extends MasterData {
	dates: Array<Date>;
	masterId: number;
}
