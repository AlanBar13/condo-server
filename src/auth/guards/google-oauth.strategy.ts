import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { configDotenv } from 'dotenv';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { OAuthUser } from '../dto/oauth-user';

configDotenv();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails } = profile;

    const user: OAuthUser = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName}`,
      lastName: `${name.familyName}`,
      accessToken,
    };

    done(null, user);
  }
}
