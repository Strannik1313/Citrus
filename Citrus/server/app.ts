import express from 'express';
import bodyParser from 'body-parser';
import { MastersRoutes } from './routes/masters.js';
import { AuthRoutes } from './routes/auth.js';
import { AdminRoutes } from './routes/admin.js';
import { PersonalRoutes } from './routes/personal.js';
import { OrderRoutes } from './routes/order.js';
import { CalendarRoutes } from './routes/calendar.js';
import { middleware } from './middleware/passport-middleware.js';
import { router as ServiceRoutes } from './routes/services.js';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api', PersonalRoutes);
app.use('/api', OrderRoutes);
app.use('/api', CalendarRoutes);
app.use('/api', MastersRoutes);
app.use('/api', ServiceRoutes);
app.use(passport.initialize());

middleware(passport);

export default app;
