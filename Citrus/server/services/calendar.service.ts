import { ServiceReturnType } from '@interfaces/ServiceReturnType';
import { db } from '@config/db';
import { MastersService } from './masters.service';
import { ProcessStatus } from '@enums/ProcessStatus';
import { WeekDto } from '@dto/WeekDto';
import { DatesHelper } from '@helpers/DatesHelper';
import { QueryDocumentSnapshot } from '@google-cloud/firestore';
import { CalendarDto } from '@dto/CalendarDto';

class CalendarServiceClass {
  async getCalendar(serviceId: number, masterId: number | undefined): Promise<ServiceReturnType<WeekDto[]>> {
    let week: WeekDto[] = DatesHelper.getWeek();
    const getMastersResult = await MastersService.getMasters(serviceId);
    switch (getMastersResult.status) {
      case ProcessStatus.ERROR: {
        return getMastersResult;
      }
      case ProcessStatus.SUCCESS: {
        try {
          const datesCollection = db.collection('calendar');
          const dates = await datesCollection
            .where('masterId', 'in', getMastersResult.data)
            .get()
            .then(collection => {
              collection.forEach((snapshot: QueryDocumentSnapshot) => {
                const masterTimes = snapshot.data() as CalendarDto;
                if (masterId === masterTimes.masterId || masterId === null) {
                  week = DatesHelper.getWeekDto(week, masterTimes);
                }
              });
              return week.map(day => {
                return {
                  date: day.date,
                  mastersId: Array.from(new Set(day.mastersId)),
                };
              });
            });
          return {
            status: ProcessStatus.SUCCESS,
            data: dates,
          };
        } catch (error) {
          return {
            status: ProcessStatus.ERROR,
            cause: error as Error,
            message: 'Не удалось получить коллекцию дней',
          };
        }
      }
    }
  }
}

export const CalendarService = new CalendarServiceClass();
