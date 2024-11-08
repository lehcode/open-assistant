import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserService from '../user/user.service';
import { LoginResponse, User } from '@open-assistant/types';

@Injectable()
class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  /**
   * Validates a user with the given username and password.
   *
   * This function will call the user service to find the user with the given
   * username. If the user exists and the given password matches the user's
   * password, the function will return the user without the password. If the
   * user does not exist or the password does not match, the function will return
   * null.
   *
   * @param {string} username - The username to validate.
   * @param {string} pass - The password to validate.
   * @returns {Promise<{ id: number; username: string; } | null>} - The validated user or null.
   */
  async validateUser(username: string, pass: string): Promise<{ id: number; username: string; } | null> {
    const user = await this.userService.findOne(username) as User;

    if (user && user.password === pass) {
      const { id, username } = user;
      return { id, username };
    }

    return null;
  }

  /**
   * Logs in with the given user and returns a login response.
   *
   * The function will validate the given user with the given username and
   * password. If the validation is successful, the function will generate a JWT
   * token and return a login response with the token. If the validation fails,
   * the function will return a login response with an error message.
   *
   * @param {User} user - The user to log in with.
   * @returns {Promise<LoginResponse>} - The login response.
   */
  async login(user: User): Promise<LoginResponse> {
    const validUser = await this.validateUser(
      user.username,
      user.password as string
    );
    
    if (validUser) {
      const payload = {
        username: validUser.username,
        sub: validUser.id,
      };
      const access_token = this.jwtService.sign(payload);

      return {
        success: true,
        username: user.username,
        access_token,
      };
    }

    return {
      success: false,
      error: 'Invalid username or password',
    };
  }
}

export default AuthService;
