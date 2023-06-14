import express from 'express';
import CalendarController from '@controllers/calendar.controller';
import { calendarControllerValidator } from '../validators/calendar.controller.validator';

const router = express.Router();

router.post('/calendar', calendarControllerValidator, CalendarController.calendar);
router.post('/calendar/schedule', CalendarController.schedule);
router.get('/calendar/months', CalendarController.months);

export { router as CalendarRoutes };
