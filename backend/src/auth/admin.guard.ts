import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (!req.user || !req.user.admin) {
      throw new ForbiddenException('관리자 권한이 필요합니다.');
    }
    return true;
  }
} 