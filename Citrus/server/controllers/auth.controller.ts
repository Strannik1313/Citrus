import bcrypt from 'bcryptjs';
import { db } from '@config/db';
import jwt from 'jsonwebtoken';
import { config } from '@config/config';
import { errorHandler } from '@utils/errorHandler';
import { Request, Response } from 'express';

class AuthController {
  async login(req: Request, res: Response) {
    await db
      .collection('authorizedClients')
      .get()
      .then(collection => {
        const candidate = collection.docs.find(d => {
          return d.data().email === req.body.email;
        });
        if (candidate !== undefined) {
          const candidateData = candidate.data();
          const passwordResult = bcrypt.compareSync(req.body.password, candidateData.password);
          if (passwordResult) {
            const token = jwt.sign({ email: candidateData.email }, config.jwt!, {
              expiresIn: 3600,
            });
            res.status(200).json({
              token: `Bearer ${token}`,
              payload: candidateData,
            });
          } else {
            res.status(401).json({
              message: 'Пароли не совпадают. Повторите попытку',
            });
          }
        } else {
          res.status(404).json({
            message: 'Пользователь с таким email не существует',
          });
        }
      });
  }

  async register(req: Request, res: Response) {
    await db
      .collection('authorizedClients')
      .get()
      .then(collection => {
        const candidate = collection.docs.find(d => {
          return d.data().email === req.body.email;
        });
        if (candidate !== undefined) {
          res.status(409).json({
            message: 'Такой email уже используется',
          });
        } else {
          const id = collection.docs.length + 1;
          const salt = bcrypt.genSaltSync(10);
          const password = req.body.password;
          try {
            db.collection('authorizedClients')
              .doc(id.toString())
              .set({
                email: req.body.email,
                password: bcrypt.hashSync(password, salt),
                id: id,
              });
            res.status(201).json({
              message: 'Регистрация прошла успешно',
            });
          } catch (error) {
            errorHandler(res, error);
          }
        }
      });
  }

  async me(req: Request, res: Response) {
    const client = db.collection('authorizedClients').doc((<{ id: number }>req.user)?.id.toString());
    await client.get().then(data => {
      try {
        res.status(200).json({
          ...data.data(),
        });
      } catch (error) {
        errorHandler(res, error);
      }
    });
  }
}

export default new AuthController();
