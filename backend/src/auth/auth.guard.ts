import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { JwtPayload } from './auth.types';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if endpoint is public
    if (this.verifyIfPublic(context)) return true;

    // Get request
    const request = context.switchToHttp().getRequest<Request>();
    // Get token from request header
    const token = this.extractTokenFromHeader(request);

    // If token is missing, throw error
    if (!token) throw new UnauthorizedException('Missing token');

    // Return true if token is valid
    return await this.verifyToken(request, token);
  }

  // Returns true if endpoint has @Public decorator
  private verifyIfPublic(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    return isPublic;
  }

  // Returns true if token is valid
  private async verifyToken(request: Request, token: string) {
    try {
      // Verify token
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: jwtConstants.secret,
      });
      request['member'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid or Expired Token!');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
