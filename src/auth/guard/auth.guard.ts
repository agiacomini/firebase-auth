import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import firebaseAdmin from '../../main';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../is-public-decorator';
// import { jwtConstants } from "../constants";

// Implementing the authentication guard we can protecting endpoints by requiring a valid JWT be present on the request.
// This is the scope of the Guard.

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private jwtService: JwtService) {}
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Phase 1: Verifying if endpoint is Public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // Phase 2: Extracting Token From Header
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // N.B: Verify the token passed to the request.

      // 1- Jwt Service Verification Token

      // const payload = await this.jwtService.verifyAsync(token, {
      //   secret: jwtConstants.secret,
      // });

      // 2- Firebase Verification Token

      const payload = await firebaseAdmin
        .auth()
        .verifyIdToken(token, true)
        .catch((error) => {
          throw new UnauthorizedException(error.message);
        });

      // We're assigning the payload to the request object here so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
