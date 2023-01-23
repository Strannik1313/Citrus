import express from 'express';
import ServicesController from '../controllers/services.controller.js';
const router = express.Router();

router.post('/services', new ServicesController().services);

export { router };
