import { db } from '@config/db';
import { config } from '@config/config';
import { errorHandler } from '@utils/errorHandler';
import passport from 'passport';
import { QuerySnapshot } from '@google-cloud/firestore';
import { ExtractJwt } from 'passport-jwt';
import { Strategy as JwtStrategy } from 'passport-jwt';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt,
};
export const middleware = (passport: passport.Authenticator) => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        await db
          .collection('authorizedClients')
          .get()
          .then((collection: QuerySnapshot) => {
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
        errorHandler(null, error);
      }
    }),
  );
};
