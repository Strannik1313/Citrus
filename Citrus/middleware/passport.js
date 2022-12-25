import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import errorHandler from '../utils/errorHandler.js';
import db from '../config/db.js';
import config from '../config/config.js';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.jwt,
};
export const middleware = passport => {
	passport.use(
		new JwtStrategy(opts, async (payload, done) => {
			try {
				await db
					.collection('authorizedClients')
					.get()
					.then(collection => {
						const candidate = collection.docs.find(d => {
							return d.data().email === payload.email;
						});
						if (candidate !== undefined) {
							done(null, candidate.data());
						} else {
							done(null, false);
						}
					});
			} catch (error) {
				errorHandler(res, error);
			}
		}),
	);
};
