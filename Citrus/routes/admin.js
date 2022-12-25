import express from 'express';
import passport from 'passport';
import AdminController from '../controllers/admin.js';
const router = express.Router();

router.get(
	'/services',
	passport.authenticate('jwt', { session: false }),
	AdminController.services,
);
router.get(
	'/orders',
	passport.authenticate('jwt', { session: false }),
	AdminController.orders,
);
router.delete(
	'/orders',
	passport.authenticate('jwt', { session: false }),
	AdminController.updateOrder,
);
router.patch(
	'/orders',
	passport.authenticate('jwt', { session: false }),
	AdminController.completeOrder,
);
router.post(
	'/master',
	passport.authenticate('jwt', { session: false }),
	AdminController.master,
);
router.post(
	'/service',
	passport.authenticate('jwt', { session: false }),
	AdminController.service,
);

export { router as AdminRoutes };
