import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'api/src/auth/auth.service';
import { AuthGuard } from 'api/src/auth/auth.guard';
import { Public } from 'api/src/decorators/public';

@Controller('auth')
export class AuthController {
  /**
   * Constructor.
   *
   * @param authService - The service for authentication.
   */
  constructor(
    private authService: AuthService
  ) {}
  
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  /**
   * Signs in the user.
   *
   * @param signInDto - The sign-in credentials. The `username` and `password` properties are required.
   * @returns The JSON Web Token to be used for authentication.
   */
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  /**
   * Retrieves the profile information of the authenticated user.
   *
   * @remarks
   * The request object is injected with the user information by the
   * {@link AuthGuard} when authentication is successful.
   *
   * @param req - The request object.
   * @returns The user profile information.
   */
  getProfile(@Request() req: any) {
    return req.user;
  }
}
