import express from 'express';
import ServicesController from '@controllers/services.controller';
import { servicesControllerValidator } from '@validators/services.controller.validator';

const router = express.Router();

router.post('/services', servicesControllerValidator, ServicesController.services);

export { router };
