import express from 'express';
import bodyParser from 'body-parser';
import { MastersRoutes } from './routes/masters.route.js';
import { AuthRoutes } from './routes/auth.route.js';
import { AdminRoutes } from './routes/admin.route.js';
import { PersonalRoutes } from './routes/personal.route.js';
import { OrderRoutes } from './routes/order.route.js';
import { CalendarRoutes } from './routes/calendar.route.js';
import { middleware } from './middleware/passport-middleware.js';
import { router as ServiceRoutes } from './routes/services.route.js';
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
