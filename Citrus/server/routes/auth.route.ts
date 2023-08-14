import express from 'express';
import passport from 'passport';
import AuthController from '@controllers/auth.controller';
import AuthControllerValidator from '@validators/auth.controller.validator';

const router = express.Router();

router.post('/login', AuthControllerValidator.validateLogin, AuthController.login);
router.post('/logout', AuthControllerValidator.validateLogout, AuthController.logout);
router.post('/register', AuthControllerValidator.validateLogin, AuthController.register);
router.get('/refresh-tokens', passport.authenticate('jwt', { session: false }), AuthController.refreshTokens);
router.get('/current-user', passport.authenticate('jwt', { session: false }), AuthController.currentUser);

export { router as AuthRoutes };
