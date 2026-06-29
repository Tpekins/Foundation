import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
      root: path.join(process.cwd(), 'apps/frontend')
    });
    app.use((req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      vite.middlewares(req, res, next);
    });
  }

  if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(process.cwd(), 'apps/frontend/dist');
    app.use(express.static(distPath));
    app.use((req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const config = new DocumentBuilder()
    .setTitle('Tianipekins.org API')
    .setDescription('Ground to Signal — Foundation API')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'admin')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, '0.0.0.0');
  console.log(`NestJS running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api/docs`);
}

bootstrap();
