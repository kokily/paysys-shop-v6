import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from 'src/types/jwt.types';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActitivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;

    if (!result) {
      throw new UnauthorizedException('인증이 필요합니다.');
    }
    return result;
  }

  handleRequest<TUser = AuthenticatedUser>(
    err: unknown,
    user: TUser,
    info: unknown,
  ) {
    if (err || !user) {
      if (info && typeof info === 'object' && 'message' in info) {
        throw new UnauthorizedException(`인증 실패: ${info.message}`);
      }

      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    return user;
  }
}
