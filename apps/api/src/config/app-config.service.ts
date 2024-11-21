import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ISupabaseAuth } from './environment';

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

  /**
   * Initializes the service.
   *
   * This method will wait until the environment variables are loaded by the
   * ConfigModule before continuing with the initialization of the service.
   *
   * @returns A promise that resolves when the service has been initialized.
   */
  private async initService() {
    await ConfigModule.envVariablesLoaded;
  }

  getAppJWTSecret(): string {
    return this.configService.get('auth.app.jwt.secret') as string;
  }

  getSupabaseJwtConfig(): Pick<ISupabaseAuth, 'jwt'> {
    return {
      jwt: {
        secret: String(process.env.SUPABASE_JWT_SECRET),
        expiresIn: String(this.configService.get('auth.supabase.jwt.expiresIn')),
      }
    };
  }
}
