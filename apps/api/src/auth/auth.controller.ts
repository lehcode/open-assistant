import { Controller, Get, Logger, Post, Request, Response, UnauthorizedException, UseGuards } from '@nestjs/common';
import type { Request as RequestType, Response as ResponseType } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import type { User } from '@app-types';
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
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestType): Promise<{ access_token: string; }> {
    if (process.env.NODE_ENV !== 'production') {
      Logger.log(`${req.method}: ${req.originalUrl}`);
      Logger.log(JSON.stringify(req.user));
    }
    
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: RequestType, @Response() res: ResponseType): Promise<void> {
    return req.logout((err) => {
      if (err) {
        if (process.env.NODE_ENV !== 'production') {
          Logger.error(err);
        }
        throw new UnauthorizedException();
      }

      return {
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
