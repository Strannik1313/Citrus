import { db } from '@config/db';
import { errorHandler } from '@utils/errorHandler';
import dayjs from 'dayjs';
import 'dayjs/locale/ru.js';
import { Request, Response } from 'express';
import { CalendarService } from '@services/calendar.service';
import { ProcessStatus } from '@enums/ProcessStatus';

dayjs.locale('ru');

class CalendarController {
  async calendar(req: Request, res: Response) {
    const getCalendarResult = await CalendarService.getCalendar(req.body.serviceId, req.body.masterId);
    switch (getCalendarResult.status) {
      case ProcessStatus.SUCCESS: {
        res.status(200).json(getCalendarResult.data);
        break;
      }
      case ProcessStatus.ERROR: {
        res.status(500).json(getCalendarResult);
        break;
      }
    }
  }

  async timesheets(req: Request, res: Response) {
    let timesheets: Array<{
      masterId: number;
      masterName: string;
      cost: number;
      freetimes: Array<number>;
    }> = [];
    let extraTimeInterval: Array<string> = [];
    const mastersIdArray: Array<number> = [];
    const mastersCollection = db.collection('masters');
    const servicesCollection = db.collection('services');
    const datesCollection = db.collection('calendar');
    await mastersCollection.get().then(collection => {
      try {
        collection.forEach(master => {
          const masterId = master.data().masterId;
          if (req.body.masterId === null || req.body.masterId === masterId) {
            mastersIdArray.push(masterId);
            timesheets.push({
              masterId,
              masterName: master.data().name,
              cost: master.data().price[master.data().serviceId.indexOf(req.body.serviceId)],
              freetimes: [],
            });
          }
        });
      } catch (error) {
        errorHandler(res, error);
      }
    });
    await servicesCollection
      .where('id', '==', req.body.serviceId)
      .get()
      .then(collection => {
        try {
          collection.forEach(service => {
            for (let i = 0; i <= 120 - service.data().duration; i = i + 10) {
              extraTimeInterval.push(i.toString());
            }
            timesheets = timesheets.map(order => {
              return {
                ...order,
                duration: service.data().duration,
              };
            });
          });
        } catch (error) {
          errorHandler(res, error);
        }
      });
    await datesCollection
      .where('masterId', 'in', mastersIdArray)
      .get()
      .then(collection => {
        try {
          collection.forEach(masterTimes => {
            for (let i = 0; i < masterTimes.data().freeTimes.length; i++) {
              if (dayjs(req.body.date).isSame(masterTimes.data().freeTimes[i].toDate(), 'day')) {
                timesheets = timesheets.map(order => {
                  if (order.masterId === masterTimes.data().masterId) {
                    return {
                      ...order,
                      freetimes: [...order.freetimes, masterTimes.data().freeTimes[i].toDate()],
                    };
                  }
                  return order;
                });
              }
            }
          });
          timesheets = timesheets.filter(order => {
            return order.freetimes.length > 0;
          });
          timesheets = timesheets.map(order => {
            return {
              ...order,
              freetimes: order.freetimes.sort((a, b) => {
                return a - b;
              }),
            };
          });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          timesheets = timesheets.map(order => {
            return {
              ...order,
              freetimes: order.freetimes.map(time => {
                return extraTimeInterval.map(interval => {
                  return dayjs(time).minute(Number(interval)).toString();
                });
              }),
            };
          });
          res.status(200).json(timesheets);
        } catch (error) {
          errorHandler(res, error);
        }
      });
  }
}

export default new CalendarController();
