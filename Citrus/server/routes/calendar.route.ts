import express from 'express';
import CalendarController from '@controllers/calendar.controller';

const router = express.Router();

router.post('/calendar', CalendarController.calendar);
router.post('/calendar/schedule', CalendarController.schedule);
router.get('/calendar/months', CalendarController.months);

export { router as CalendarRoutes };
