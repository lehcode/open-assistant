import { AuthCredentials, User } from '@lib/shared';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserService from '../user/user.service';

@Injectable()
class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  
  /**
   * Validate a user with the given username and password.
   *
   * This function will validate the given user with the given username and
   * password. If the user exists and the given password matches the user's
   * password, the function will return the user. If the user does not exist or
   * the password does not match, the function will return null.
   *
   * @param {string} username - The username to validate.
   * @param {string} pass - The password to validate.
   * @returns {Promise<{ id: number; username: string } | null>} - The validated user or null.
   */
  async validateUser(username: string, pass: string): Promise<{ id: number; username: string } | null> {
    const user = (await this.userService.findOne(username)) as User;

    if (user && user.password === pass) {
      const { id, username } = user;
      return { id, username };
    }

    return null;
  }

  /**
   * Attempt to log in the user with the given user object.
   *
   * This function will generate a JWT token for the user and return an
   * AuthCredentials object containing the user's id, username, and the JWT
   * token.
   *
   * @param {User} user - The user object to log in.
   * @returns {Promise<AuthCredentials>} - A promise that resolves to an AuthCredentials object.
   */
  async login(user: User): Promise<AuthCredentials> {
    const access_token = await this.jwtService.signAsync({
      username: user.username,
      sub: user.id,
    });

    return {
      userId: user.id,
      userName: user.username,
      accessToken: access_token,
    };
  }
}

export default AuthService;
