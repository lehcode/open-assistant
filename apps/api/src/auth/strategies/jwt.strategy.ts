
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * The constructor for the JwtStrategy class.
   *
   * This constructor initializes the JWT strategy with the configuration
   * for the JWT authentication.
   *
   * @param options - The configuration options for the JWT strategy.
   */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * Validate a JWT payload.
   *
   * This function will be called by NestJS every time a JWT token is sent to the
   * server. The function will receive the payload of the JWT token and must
   * return the user that is associated with the payload.
   *
   * @param payload - The payload of the JWT token.
   * @returns The user that is associated with the payload.
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
