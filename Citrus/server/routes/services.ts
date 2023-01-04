import express from 'express';
import ServicesController from '../controllers/services.js';
const router = express.Router();

router.post('/services', new ServicesController().services);

export { router };
