import type { IAuthCredentials, LoginResponse, User } from '@lib/shared';
import { Controller, Get, HttpException, HttpStatus, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request as RequestType } from 'express';
import AuthService from './auth.service';
import { Public } from './decorators/public';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private configService: ConfigService) {}

  // @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  /**
   * Authenticates a user.
   *
   * @remarks
   * This route is marked with the {@link Public} decorator, meaning that
   * it does not require authentication. When a user sends a request to this
   * route with a valid username and password, the route will return an
   * {@link AuthCredentials} object containing the user's id, username, and a
   * JSON Web Token that can be used to authenticate the user for subsequent
   * requests. If the user's credentials are invalid, the route will throw a
   * 403 Forbidden HTTP exception.
   *
   * @param req - The Express request object.
   * @returns An `AuthCredentials` object or a 403 Forbidden HTTP exception.
   */
  async login(@Request() req: RequestType): Promise<LoginResponse<IAuthCredentials>> {
    if (process.env.NODE_ENV !== 'production') {
      Logger.log(`${req.method}: ${req.originalUrl}`);
      Logger.log(JSON.stringify(req.body));
    }
    
    const validUser = await this.authService.validateUser(
      req.body.username,
      req.body.password
    );

    if (!validUser) {
      throw new HttpException('Invalid username or password', HttpStatus.FORBIDDEN);
    }

    const loginCredentials = await this.authService.login({ ...validUser});
    
    return {
      success: true,
      statusCode: HttpStatus.OK,
      data: loginCredentials
    } as LoginResponse<IAuthCredentials>;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: RequestType): Promise<any> {
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
