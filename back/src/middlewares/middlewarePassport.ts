import passport, { AuthenticateCallback } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { UserModel } from '../schemas/user';
import passportJWT from 'passport-jwt';
import { secretAccessToken } from '../config';
import { logger } from '../features/logger';
import { AuthSessionModel } from '../schemas/auth';
import { RequestHandler } from 'express';
import { translateES } from '../utils/translate';

const { Strategy: JWTStrategy, ExtractJwt } = passportJWT;
/////////////////////////////////////////////////////////////////

passport.use(
  new LocalStrategy(async (email: string, password: string, done) => {
    try {
      const user = await UserModel.findOne({ email }).select('+password');

      if (!user) {
        return done(null, false, {
          message: translateES['Usuario o contraseña incorrectos.']
        });
      }

      const session = await AuthSessionModel.findOne({ userId: user?.id });

      if (session) {
        return done(null, false, {
          message:
            translateES[
              'Ya tiene una sesión abierta en otro dispositivo. Por motivos de seguridad no permitimos varias sesiones con las mismas credenciales.'
            ]
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, {
          message: translateES['Usuario o contraseña incorrectos.']
        });
      }

      logger.info(`User ${user.email} logged in.`);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretAccessToken
    },
    async (jwt_payload, done) => {
      const session = await AuthSessionModel.findOne({ userId: jwt_payload.id });

      if (!session) {
        return done(null, false, {
          message:
            translateES[
              'No tiene una sesión abierta en este dispositivo o venció el tiempo de expiración.'
            ]
        });
      }

      const user = await UserModel.findById(jwt_payload.id).select('+firebaseToken');

      if (!user) {
        return done(null, false, {
          message: translateES['Usuario o contraseña incorrectos.']
        });
      }

      return done(null, user);
    }
  )
);

export const middlewareAutentication: RequestHandler = (req, res, next) => {
  const callback: AuthenticateCallback = (error, user, info) => {
    if (error) return next(error);

    if (!user) {
      //@ts-expect-error ignore
      const message = info?.message as string | undefined;
      return res.status(401).send({
        message: message || translateES['Error en la autenticación.']
      });
    }

    req.user = user;
    next();
  };

  passport.authenticate(
    'local',
    {
      session: false
    },
    callback
  )(req, res, next);
};

export const passportMiddlewareInitialize = passport.initialize();

export const middlewarePassportJwt: RequestHandler = (req, res, next) => {
  const callback: AuthenticateCallback = (error, user, info) => {
    if (error) return next(error);

    if (!user) {
      //@ts-expect-error ignore
      const message = info?.message as string | undefined;

      return res.status(401).send({
        message: message || translateES['Error en la autenticación.']
      });
    }

    req.user = user;
    next();
  };

  passport.authenticate(
    'jwt',
    {
      session: false
    },
    callback
  )(req, res, next);
};
