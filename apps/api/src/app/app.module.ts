import { Module } from '@nestjs/common';
import { ConfigModule as GlobalConfigModule } from '@nestjs/config';
import { AuthController } from '../auth/auth.controller';
import { AuthModule } from '../auth/auth.module';
import { AppConfigService } from '../config/app-config.service';
import yamlConfig from '../config/yaml.config';
import envConfig from '../environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule, 
    GlobalConfigModule.forRoot({ 
      isGlobal: true,
      cache: true,
      load: [
        // last loaded config takes precedence
        yamlConfig,
        () => envConfig,
      ]
    })
  ],
  controllers: [
    AppController,
    AuthController
  ],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
