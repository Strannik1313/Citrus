import express from 'express';
import MastersController from '@controllers/masters.controller';
import { mastersControllerValidator } from '../validators/masters.controller.validator';

const router = express.Router();

router.post('/masters', mastersControllerValidator, MastersController.masters);

export { router as MastersRoutes };
