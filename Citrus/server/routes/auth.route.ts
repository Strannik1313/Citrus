import express from 'express';
import passport from 'passport';
import AuthController from '@controllers/auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/register', AuthController.register);
router.get('/refresh-tokens', passport.authenticate('jwt', { session: false }), AuthController.refreshTokens);

export { router as AuthRoutes };
