import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { TokenInfo } from '../auth.service';

declare global {
  namespace Express {
    export interface Request {
      user?: TokenInfo;
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.jwtService.verifyAsync<TokenInfo>(token, {
        secret: process.env.JWT_SECRET,
      });

      if (requiredRoles) {
        const roleFound = requiredRoles.some((role) =>
          user.role.includes(role),
        );
        if (!roleFound) {
          throw new ForbiddenException('Incorrect Role');
        }
      }

      request.user = user;
    } catch (err) {
      Logger.warn(err.message);
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
