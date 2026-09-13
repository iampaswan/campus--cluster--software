// config/passport.ts

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { AppDataSource } from '../configuration/data-source';
import { User } from '../entities/user-entity';


const userRepo = AppDataSource.getRepository(User);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(null, false);
        }

        let user = await userRepo.findOne({
          where: { email },
        });

        if (!user) {
          user = userRepo.create({
            name: profile.displayName,
            email,
            password: null,
            googleId: profile.id,
            profileUrl: profile.photos?.[0]?.value,
            authProvider: 'google',
          });

          await userRepo.save(user);
        } else if (!user.googleId) {
          user.googleId = profile.id;
          await userRepo.save(user);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);