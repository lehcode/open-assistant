import { Controller, Get, Logger, Post, Request, UseGuards } from '@nestjs/common';
import type { Request as RequestType } from 'express';
import AuthService from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { LoginResponse, User } from '@lib/shared';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  /**
   * Handles user login.
   *
   * This function processes a login request. It logs request details in non-production
   * environments and uses the `AuthService` to authenticate the user.
   *
   * @param {RequestType} req - The Express request object containing the login credentials.
   * @returns {Promise<AuthTypes.LoginResponse>} A promise that resolves to a LoginResponse object.
   *                                   This includes a token and username on successful login,
   *                                   or an error message on failure.
   */
  async login(@Request() req: RequestType): Promise<LoginResponse> {
    if (process.env.NODE_ENV !== 'production') {
      Logger.log(`${req.method}: ${req.originalUrl}`);
      Logger.log(JSON.stringify(req.body));
    }

    return this.authService.login(req.body as User);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  /**
   * Logs out the authenticated user.
   *
   * This function handles the logout process for an authenticated user. It's protected
   * by `JwtAuthGuard` to ensure only authenticated users can access it. The function
   * uses the `logout()` method provided by the `request` object, maintaining session info.
   *
   * @param {RequestType} req - The Express `Request` object containing the logout method.
   * @returns {Promise<void>} A `Promise` that resolves when the logout process is complete.
   *                          The actual return value (success or error message) is passed
   *                          to the client via the callback function.
   */
  async logout(@Request() req: RequestType): Promise<void> {
    return req.logout({ keepSessionInfo: true }, (err) => {
      if (err) {
        if (process.env.NODE_ENV !== 'production') {
          Logger.error(err);
        }

        return {
          success: false,
          message: 'Not authorized',
        };
      }

      return {
        success: true,
        message: 'Successfully logged out',
      };
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  /**
   * Retrieves the profile of the authenticated user.
   *
   * This function is protected by JwtAuthGuard, ensuring that only authenticated
   * users can access it. It returns the user object associated with the current request.
   *
   * @param {RequestType} req - The Express request object, which contains the user
   *                            information after successful authentication.
   * @returns {User} The UserTypes.User object representing the authenticated user's profile.
   *                 This object is extracted from the request's user property.
   */
  getProfile(@Request() req: RequestType): User {
    return req.user as User;
  }
}
