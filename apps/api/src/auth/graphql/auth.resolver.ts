import type { IAuthCredentials, ILoginRequest, LoginResponse, SafeUser } from '@libs/shared';
import { HttpStatus, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createClient, type AuthUser as SupabaseAuthUser, type SupabaseClient } from '@supabase/supabase-js';
import { AuthResult } from '../../auth/graphql/auth-result.interface';
import { GqlUser } from '../../user/models/user.interface';
import { AuthService } from '../auth.service';
import { CurrentUser } from '../decorators/current-user';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { SharedService } from '../shared.service';

@Resolver()
export class AuthResolver {
  private supabase: SupabaseClient;
  
  constructor(
    private readonly authService: AuthService,
    private readonly sharedService: SharedService,
    private configService: ConfigService
  ) {
    this.supabase = createClient(
      this.configService.get('supabase.url') as string,
      this.configService.get('supabase.key') as string
    );
  }

  @Query(() => GqlUser, { name: 'lehcode' })
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: SupabaseAuthUser) {
    debugger;
    return user;
  }

  @Mutation(() => AuthResult)
  async login(@Args('loginInput') loginInput: ILoginRequest) {
    debugger;

    let validUser: LoginResponse<IAuthCredentials>;

    try {
      validUser = await this.sharedService.login(loginInput, this.supabase);
    } catch (e) {
      debugger;
      return {
        success: false,
        statusCode: HttpStatus.FORBIDDEN,
      };
    }

    debugger;

    return validUser;
  }

  @Mutation(() => AuthResult)
  async refreshToken(@Args('safeUser') safeUser: SafeUser) {
    debugger;
    // return this.authService.setAppAuthToken(safeUser);
  }
}
