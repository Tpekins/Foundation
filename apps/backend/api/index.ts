import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { AppModule } from '../src/app.module';

// NestJS apps normally call app.listen(port) and run forever. Vercel's
// serverless model instead calls a single exported function per request, so
// we build the Nest app once (cached across warm invocations) and hand
// requests to its underlying Express instance directly, rather than ever
// calling .listen().
let cachedServer: express.Express | null = null;

async function bootstrapServer(): Promise<express.Express> {
  const expressApp = express();
  // Express 4.21+ throws when adapter calls app.get('router')
  (expressApp as any).router = undefined;
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  await app.init();
  return expressApp;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  cachedServer(req as any, res as any);
}
