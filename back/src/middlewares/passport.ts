import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { UserModel } from "../schemas/user";
import passportJWT from "passport-jwt";
import { SECRET_ACCESS_TOKEN } from "../constants/auth";

const { Strategy: JWTStrategy, ExtractJwt } = passportJWT;
/////////////////////////////////////////////////////////////////

passport.use(
  new LocalStrategy(async (email: string, password: string, done) => {
    try {
      const user = await UserModel.findOne({ email }).select("+password");

      if (!user) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }

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
      secretOrKey: SECRET_ACCESS_TOKEN,
    },
    (jwt_payload, done) => {
      UserModel.findById(jwt_payload.id)
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false, {
            message: "Token not matched.",
          });
        });
    }
  )
);

export const passportLocalMiddleware = passport.authenticate("local", {
  session: false,
});

export const passportMiddlewareInitialize = passport.initialize();

export const passportJwtMiddleware = passport.authenticate("jwt", {
  session: false,
});

// passport.serializeUser(function (user: any, done) {
//   done(null, user._id);
// });

// passport.deserializeUser(function (id, done) {
//   UserModel.findById(id, function (err: any, user: any) {
//     done(err, user);
//   });
// });
