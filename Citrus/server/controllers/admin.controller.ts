import { db } from '@config/db';
import { errorHandler } from '@utils/errorHandler';
import { Request, Response } from 'express';
import { DocumentData } from '@google-cloud/firestore';

class AdminController {
  async services(req: Request, res: Response) {
    const servicesArray = db.collection('procedureDuration');
    await servicesArray.get().then(collection => {
      try {
        const array: Array<string> = [];
        collection.docs.forEach(d => {
          array.push(d.id);
        });
        res.status(200).json(array);
      } catch (error: unknown) {
        errorHandler(res, error);
      }
    });
  }

  async updateOrder(req: Request, res: Response) {
    const ordersArray = db.collection('orders');
    await ordersArray.get().then(collection => {
      try {
        ordersArray.doc(req.headers.orderid as string).delete();
        res.status(200).json({
          statusCode: 0,
          message: 'Данные успешно удалены',
        });
      } catch (error) {
        errorHandler(res, error);
      }
    });
  }

  async completeOrder(req: Request, res: Response) {
    const ordersArray = db.collection('orders');
    await ordersArray.get().then(collection => {
      try {
        ordersArray.doc(req.body.orderId).update({
          isDoneByAdmin: true,
        });
        res.status(200).json({
          statusCode: 0,
          message: 'Операция прошла успешно',
        });
      } catch (error) {
        errorHandler(res, error);
      }
    });
  }

  async orders(req: Request, res: Response) {
    const ordersArray = db.collection('orders');
    const startItem = Number(req.headers.startitem);
    const pageSize = Number(req.headers.pagesize);
    await ordersArray.get().then(collection => {
      try {
        let array = [];
        let tempArray;
        let newCollection: Array<DocumentData> = [];
        collection.forEach(coll => {
          if (!coll.data().isDoneByAdmin) {
            newCollection.push({
              ...coll.data(),
              orderId: coll.id,
            });
          }
        });
        for (let i = 1; i <= newCollection.length; i++) {
          if (i >= startItem && i < startItem + pageSize) {
            tempArray = newCollection[i - 1];
            tempArray = {
              ...tempArray,
              date: tempArray.date.toDate(),
              quantityOfOrders: newCollection.length,
            };
            array.push(tempArray);
          }
        }
        res.status(200).json(array);
      } catch (error) {
        errorHandler(res, error);
      }
    });
  }

  async service(req: Request, res: Response) {
    const servicesArray = db.collection('procedureDuration');
    await servicesArray.get().then(collection => {
      try {
        servicesArray.doc(req.body.service).set({
          hour: req.body.duration.hour,
          minute: req.body.duration.minute,
        });
        res.status(200).json({
          message: 'Данные успешно добавлены',
        });
      } catch (error) {
        errorHandler(res, error);
      }
    });
  }

  async master(req: Request, res: Response) {
    const mastersArray = db.collection('masters');
    await mastersArray.get().then(collection => {
      try {
        const id = collection.docs.length + 1;
        mastersArray.doc(id.toString()).set({
          name: req.body.masterName,
          services: [...req.body.services],
          price: [...req.body.price],
        });
        res.status(200).json({
          message: 'Данные успешно добавлены',
        });
      } catch (error) {
        errorHandler(res, error);
      }
    });
  }
}

export default new AdminController();
