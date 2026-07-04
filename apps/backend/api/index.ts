import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { AppModule } from '../src/app.module';

let cachedServer: express.Express | null = null;

async function bootstrapServer(): Promise<express.Express> {
  const expressApp = express();
  // Express 4.21 defined app.router as a non-configurable getter that throws.
  // NestJS's ExpressAdapter.isMiddlewareApplied reads app.router directly,
  // so we proxy the instance to return undefined for 'router'.
  const proxiedApp = new Proxy(expressApp, {
    get(target, prop, receiver) {
      if (prop === 'router') return undefined;
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
      (target as any)[prop] = value;
      return true;
    },
  });
  const adapter = new ExpressAdapter(proxiedApp);
  const app = await NestFactory.create(AppModule, adapter);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const config = new DocumentBuilder()
    .setTitle('Tianipekins.org API')
    .setDescription('Ground to Signal — Foundation API')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'admin')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.init();
  return expressApp;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  cachedServer(req as any, res as any);
}
