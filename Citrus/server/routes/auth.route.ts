import express from 'express';
import passport from 'passport';
import AuthController from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get(
	'/me',
	passport.authenticate('jwt', { session: false }),
	AuthController.me,
);

export { router as AuthRoutes };
