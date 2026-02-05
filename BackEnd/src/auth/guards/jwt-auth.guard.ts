import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

/**
 * Placeholder JWT auth guard.
 * Replace body with actual JWT verification logic
 * (e.g. @nestjs/passport AuthGuard('jwt') or manual jwt.verify).
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string | undefined>; user?: unknown }>();
    const authorization = request.headers['authorization'];

    if (!authorization?.startsWith('Bearer ')) {
      throw new HttpException('Missing or invalid token', HttpStatus.UNAUTHORIZED);
    }

    // TODO: verify JWT and attach user to request
    // const token = authorization.slice(7);
    // request.user = await this.authService.validateToken(token);

    return true;
  }
}
