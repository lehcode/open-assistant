import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  /**
   * Initializes the service.
   *
   * This constructor will load the environment variables and wait until they are loaded
   * before continuing with the initialization of the service.
   *
   * @param configService The ConfigService instance.
   */
  constructor(private readonly configService: ConfigService) {
    this.initService();
  }

  private async initService() {
    await ConfigModule.envVariablesLoaded;
  }
}
