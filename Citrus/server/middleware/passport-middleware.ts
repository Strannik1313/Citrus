import { config } from '@config/config';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { AuthService } from '@services/auth.service';
import { Request } from 'express';
import { UserDto } from '@dto/UserDto';

const tokenExtractor = (req: Request) => {
	const accessToken = req.header('authorization');
	const refreshToken = req.header('cookie');
	if (accessToken) return accessToken;
	if (refreshToken) return refreshToken;
	return null;
};

const opts = {
	jwtFromRequest: tokenExtractor,
	secretOrKey: config.jwt,
};
export const passportMiddleware = (passport: passport.Authenticator) => {
	passport.use(
		new JwtStrategy(opts, async (payload, done) => {
			let candidate: UserDto;
			try {
				candidate = await AuthService.getUserById(payload.userId);
				done(null, candidate);
			} catch (error) {
				done(null, false);
			}
		}),
	);
};
