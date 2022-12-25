import express from 'express';
import MastersController from '../controllers/masters.js';
const router = express.Router();

router.post('/masters', MastersController.masters);

export { router as MastersRoutes };
