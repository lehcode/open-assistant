import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'api/src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'api/src/auth/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'api/src/auth/auth.guard';


@Module({
  imports: [
    UserModule,
    // See https://github.com/nestjs/jwt/blob/master/README.md
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
  exports: [AuthService],
})

export class AuthModule {}
