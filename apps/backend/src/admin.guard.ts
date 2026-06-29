import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'] as string | undefined;
    const expectedKey = process.env.ADMIN_API_KEY;

    if (!expectedKey) {
      throw new UnauthorizedException('Admin API key not configured on server');
    }

    if (!apiKey || apiKey !== expectedKey) {
      throw new UnauthorizedException('Invalid or missing admin API key');
    }

    return true;
  }
}
