
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import AuthService from '../auth.service';

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
   * Validate a user using the local strategy.
   *
   * This function will validate a user based on the given username and password.
   * If the user exists and the given password matches the user's password, the
   * function will return the user. If the user does not exist or the password
   * does not match, the function will return false.
   *
   * @param {string} username - The username to validate.
   * @param {string} password - The password to validate.
   * @returns {Promise<{ id: number, username: string } | false>} - The validated user or false.
   */
  async validate(username: string, password: string): Promise<{ id: number, username: string } | false> {
    const user = await this.authService.validateUser(username, password);
    
    if (!user) {
      return false;
    }

    return user;
  }
}
