import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule as GlobalConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { SharedService } from 'apps/api/src/auth/shared.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AppConfigService } from './config/app-config.service';
import envConfig from './config/environment';
import supabaseConfig from './config/supabase.config';
import yamlConfig from './config/yaml.config';
import UserService from './user/user.service';

@Module({
  imports: [
    AuthModule, 
    GlobalConfigModule.forRoot({ 
      isGlobal: true,
      cache: process.env.NODE_ENV === 'production' ? true : false,
      load: [
        yamlConfig,
        // last loaded config takes precedence
        () => envConfig,
        supabaseConfig
      ]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // or path to your schema file
      context: ({ req }: any) => ({ req }),
    })
  ],
  controllers: [
    AppController,
    AuthController
  ],
  providers: [AppService, AppConfigService, UserService, SharedService],
})
export class AppModule {}
