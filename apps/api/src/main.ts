/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { AppModule } from './app/app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const globalPrefix = 'api/v1';
    app.setGlobalPrefix(globalPrefix);
    
    const port = process.env.PORT || 3000;
    const host = process.env.HOST || 'localhost';
    
    // Handle shutdown gracefully
    process.on('SIGTERM', async () => {
      await app.close();
      process.exit(0);
    });

    app.use(
      session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
      }),
    );

    await app.listen(port);
    
    Logger.log(
      `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`
    );
  } catch (error) {
    Logger.error('Failed to start application', error);
    process.exit(1);
  }
}

bootstrap();
