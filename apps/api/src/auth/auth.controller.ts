import { Controller, Get, Logger, Post, Request, Response, UseGuards } from '@nestjs/common';
import type { Request as RequestType, Response as ResponseType } from 'express';
import AuthService from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { LoginResponse, User } from '@types';
import { Public } from './decorators/public';

@Controller('auth')
export class AuthController {
  /**
   * Constructor.
   *
   * @param authService - The service for authentication.
   */
  constructor(private readonly authService: AuthService) {}
  
  @Public()
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  /**
   * Log in with the given user.
   *
   * The function will make a POST request to the login endpoint with the given
   * user. If the login is successful, the function will return a login response
   * with the user's token and username. If the login fails, the function will
   * return a login response with an error message.
   *
   * @param {Request} req - The request with the user to log in with.
   * @returns {Promise<LoginResponse>} - A promise with the login response.
   */
  async login(@Request() req: RequestType): Promise<LoginResponse> {
    if (process.env.NODE_ENV !== 'production') {
      Logger.log(`${req.method}: ${req.originalUrl}`);
      Logger.log(JSON.stringify(req.body));
    }
      
    return this.authService.login(req.body as User)
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: RequestType, @Response() res: ResponseType): Promise<void> {
    return req.logout({keepSessionInfo: true}, (err) => {
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
  getProfile(@Request() req: RequestType): User {
    return req.user as User;
  }
}
