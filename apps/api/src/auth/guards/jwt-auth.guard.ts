import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_PATH } from '../decorators/public';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * The constructor for the JwtAuthGuard class.
   *
   * @param reflector - The NestJS Reflector to use to inspect the route handlers
   * and determine if the route is public or not.
   */
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * A function that will be called for every incoming request.
   *
   * If the route is marked as public, this function will return true.
   * Otherwise, this function will call the parent class's canActivate method
   * to enforce the authentication.
   *
   * @param context - The ExecutionContext for the request.
   * @returns A boolean indicating whether the request is allowed to proceed.
   */
  override canActivate(context: ExecutionContext) {
    // Add authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PATH, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  /**
   * Called when authentication is complete.
   *
   * This function is called by the NestJS framework when the authentication
   * process is complete. If there is an error or the user is not found, the
   * function throws an exception. Otherwise, the function returns the user
   * object.
   *
   * @param err - The error object if there was an error during authentication.
   * @param user - The user object if the authentication was successful.
   * @returns The user object if the authentication was successful.
   * @throws Throws an UnauthorizedException if there is an error or the user is not found.
   */
  override handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
