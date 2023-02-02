export interface Schedule {
  masterId: number;
  masterName: string;
  cost: number;
  duration: number;
  freetimes: Array<string[]>;
}
