import express from 'express';
import CalendarController from '@controllers/calendar.controller';

const router = express.Router();

router.post('/calendar', CalendarController.calendar);
router.post('/calendar/schedule', CalendarController.schedule);

export { router as CalendarRoutes };
