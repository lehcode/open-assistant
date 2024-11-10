/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';

  try {
    const app = await NestFactory.create(AppModule, {
      cors: {
        origin:
          process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' ? true : `http://${host}:${port}`,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      },
    });
    const globalPrefix = 'api/v1';
    app.setGlobalPrefix(globalPrefix);

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
      })
    );

    const config = new DocumentBuilder()
      .setTitle('Open Assistant')
      .setDescription('API description')
      .setVersion('1.0')
      .addTag('api')
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(port);

    Logger.log(`🚀 Application is running on: http://${host}:${port}/${globalPrefix}`);
  } catch (error) {
    Logger.error('Failed to start application', error);
    process.exit(1);
  }
}

bootstrap();
