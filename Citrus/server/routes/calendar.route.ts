import express from 'express';
import CalendarController from '@controllers/calendar.controller';

const router = express.Router();

router.post('/calendar', CalendarController.calendar);
router.post('/calendar/timesheets', CalendarController.timesheets);

export { router as CalendarRoutes };
