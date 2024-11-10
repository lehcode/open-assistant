
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import AuthService from '../auth.service';
import { User } from '@lib/shared';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * LocalStrategy constructor.
   *
   * @param authService - The service for authentication.
   */
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * Validate a user with the given username and password.
   * 
   * This function will validate the given user with the given username and
   * password. If the user exists and the given password matches the user's
   * password, the function will return the user. If the user does not exist or
   * the password does not match, the function will throw an UnauthorizedException.
   * 
   * @param {string} username - The username to validate.
   * @param {string} password - The password to validate.
   * @returns {Promise<User>} - The validated user.
   */
  async validate(username: string, password: string): Promise<User | false> {
    const user = await this.authService.validateUser(username, password);
    
    if (!user) {
      return false;
    }

    return user;
  }
}
