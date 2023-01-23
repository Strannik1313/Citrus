import { Timestamp } from '@google-cloud/firestore';

export interface CalendarDto {
  freeTimes: Array<Timestamp>;
  masterId: number;
}
