import express from 'express';
import MastersController from '@controllers/masters.controller';

const router = express.Router();

router.post('/masters', MastersController.masters);

export { router as MastersRoutes };
