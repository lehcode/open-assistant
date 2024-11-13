import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import UserService from './user.service';

@Module({
  providers: [UserService, ConfigService],
  exports: [UserService],
})

export class UserModule {}
