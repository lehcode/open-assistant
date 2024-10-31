import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'api/src/auth/auth.module';
import { AuthController } from 'api/src/auth/auth.controller';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
