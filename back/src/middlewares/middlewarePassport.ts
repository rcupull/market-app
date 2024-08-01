import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { UserModel } from '../schemas/user';
import passportJWT from 'passport-jwt';
import { secretAccessToken } from '../config';
import { logger } from '../features/logger';
import { AuthSessionModel } from '../schemas/auth';

const { Strategy: JWTStrategy, ExtractJwt } = passportJWT;
/////////////////////////////////////////////////////////////////

passport.use(
  new LocalStrategy(async (email: string, password: string, done) => {
    try {
      const user = await UserModel.findOne({ email }).select('+password');

      if (!user) {
        return done(null, false, {
          message: 'Incorrect username or password.',
        });
      }

      const session = await AuthSessionModel.findOne({ userId: user?.id });

      if (session) {
        return done(null, false);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, {
          message: 'Incorrect username or password.',
        });
      }

      logger.info(`User ${user.email} logged in.`);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretAccessToken,
    },
    async (jwt_payload, done) => {
      const session = await AuthSessionModel.findOne({ userId: jwt_payload.id });

      if (!session) {
        return done(null, false, {
          message: 'Has not access.',
        });
      }

      const user = await UserModel.findById(jwt_payload.id).select('+firebaseToken');

      if (!user) {
        return done(null, false, {
          message: 'Has not access.',
        });
      }

      return done(null, user);
    },
  ),
);

export const middlewareAutentication = passport.authenticate('local', {
  session: false,
});

export const passportMiddlewareInitialize = passport.initialize();

export const middlewarePassportJwt = passport.authenticate('jwt', {
  session: false,
});
