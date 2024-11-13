/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import session from 'express-session';
import { AppModule } from './app/app.module';

const appModuleConfig = {
  cors: {
    origin:
      process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'
        ? true
        : ['http://localhost:4200', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  },
};
const globalPrefix = 'api/v1';
const swaggerConfig = new DocumentBuilder()
  .setTitle('Open Assistant API')
  .setDescription('Description')
  .setVersion('1.0')
  .addTag('api')
  .build();

/**
 * Bootstraps the NestJS application.
 *
 * This function will create a NestJS application with the AppModule and the
 * given configuration. It will also set up the Swagger documentation and
 * configure the session middleware.
 *
 * The function will handle the SIGTERM signal and will close the application
 * gracefully when it receives this signal.
 *
 * @returns {Promise<void>} A promise that resolves when the application has
 * been started or rejects if an error occurs.
 */
async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.create(AppModule, appModuleConfig);
    app.setGlobalPrefix(globalPrefix);

    // Handle shutdown gracefully
    process.on('SIGTERM', async () => {
      await app.close();
      process.exit(0);
    });

    const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, documentFactory);

    const configService = app.get(ConfigService);

    const port = configService.get('http.port') || 4443;
    const host = configService.get('http.host') || 'localhost';
    const jwtSecret = configService.get('auth.jwt.secret') || 'my-secret';
    const jwtLifetime = configService.get('auth.jwt.lifetime') || '5m';

    app.use(
      session({
        secret: jwtSecret,
        resave: false,
        saveUninitialized: false,
      })
    );

    await app.listen(port);

    Logger.log(`🚀 Application is running on: http://${host}:${port}/${globalPrefix}`);
  } catch (error) {
    Logger.error('Failed to start application', error);
    process.exit(1);
  }
}

bootstrap();
