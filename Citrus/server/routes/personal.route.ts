import express from 'express';
import passport from 'passport';
import PersonalController from '../controllers/personal.controller.js';
const router = express.Router();

router.post(
	'/personal',
	passport.authenticate('jwt', { session: false }),
	PersonalController.personal,
);
router.get(
	'/personal/orders',
	passport.authenticate('jwt', { session: false }),
	PersonalController.getPersonalOrders,
);

export { router as PersonalRoutes };
