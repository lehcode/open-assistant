import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from '../auth/graphql/auth.resolver';
import { SupabaseStrategy } from '../auth/strategies/supabase.strategy';
import { SupabaseService } from '../supabase/supabase.service';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SharedService } from './shared.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';


@Module({
  imports: [
    UserModule,
    // See https://github.com/nestjs/jwt/blob/master/README.md
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
    PassportModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AuthService,
    LocalStrategy,
    JwtStrategy,
    SupabaseService,
    AuthResolver,
    SupabaseStrategy,
    SharedService
  ],
  exports: [AuthService, SupabaseService],
})

export class AuthModule {}
