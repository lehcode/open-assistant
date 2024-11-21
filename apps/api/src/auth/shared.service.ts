import { IAuthCredentials, LoginResponse, SafeUser } from "@libs/shared";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SupabaseClient } from "@supabase/supabase-js";
import UserService from "../user/user.service";
import AuthService from "./auth.service";


@Injectable()
export class SharedService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Attempt to log in the user with the given username and password.
   *
   * This function will validate the given user with the given username and
   * password. If the user exists and the given password matches the user's
   * password, the function will return a JWT token for the user.
   * If the user does not exist or the password does not match, the function will
   * throw a 403 Forbidden HTTP exception.
   *
   * @param {RequestType} req - The Express request object.
   * @param {SupabaseClient} supabase - The Supabase client instance.
   * @returns {Promise<LoginResponse<IAuthCredentials>>} - A promise that resolves to a
   *          LoginResponse object containing the user's id, username, and the JWT token.
   */
  async login (req: any, supabase: SupabaseClient): Promise<LoginResponse<IAuthCredentials>> {
    let validUser: SafeUser = {
      id: 0,
      username: '',
    };
    const validResponse: LoginResponse<IAuthCredentials> = {
      success: true,
      statusCode: HttpStatus.OK,
      data: {
        userId: null,
        userName: '',
        accessToken: '',
        refreshToken: '',
      },
    };
  
    const ERROR_INVALID_USER = 'Invalid user';
  
    try {
      const validated = await this.authService.validateUser(req.body.username, req.body.password);
  
      if (validated) {
        validUser = validated;
      } else {
        throw new Error(ERROR_INVALID_USER);
      }
  
      if (!validUser) {
        throw new HttpException('Invalid username or password', HttpStatus.FORBIDDEN);
      }
  
    } catch (error) {
      throw new Error(ERROR_INVALID_USER);
    }
  
    const loginCredentials = await this.authService.login({ ...validUser });
    validResponse.data = loginCredentials;
  
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validUser.username,
      password: req.body.password,
    });
  
    if (error) throw error;
    else this.authService.supabaseLogin(data);
  
    return validResponse;
  };
}
