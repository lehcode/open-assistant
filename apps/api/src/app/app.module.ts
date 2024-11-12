import { Module } from '@nestjs/common';
import { ConfigModule as GlobalConfigModule } from '@nestjs/config';
import { AuthController } from '../auth/auth.controller';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import yamlConfig from './config/yaml.config';

@Module({
  imports: [AuthModule, GlobalConfigModule.forRoot({ isGlobal: true, cache: true, load: [yamlConfig], })],
  controllers: [AppController, AuthController],
  providers: [AppService],
})

export class AppModule {}
