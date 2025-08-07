import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

// 사용자 정보 타입 정의
interface AuthenticatedUser {
  user_id: string;
  username: string;
  admin: boolean;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * 인증 처리 메서드
   * - JWT 토큰 검증 수행
   * - 인증 성공 시 사용자 정보를 request에 주입
   * - 이증 실패 시 적절한 에러 처리
   * @param context 실행 컨텍스트
   * @returns 인증 결과
   * @throws UnauthorizedException 인증 실패 시
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 부모 클래스 인증 로직 실행
    const result = (await super.canActivate(context)) as boolean;

    if (!result) {
      throw new UnauthorizedException('인증이 필요합니다.');
    }

    return result;
  }

  handleRequest<TUser = AuthenticatedUser>(
    err: unknown,
    user: TUser,
    info: unknown
  ) {    
    // 인증 에러 발생 시
    if (err || !user) {
      if (info && typeof info === 'object' && 'message' in info) {
        throw new UnauthorizedException(`인증 실패: ${info.message}`);
      }

      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    return user;
  }
}