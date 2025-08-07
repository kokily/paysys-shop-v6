import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';

// JWT 페이로드 타입 정의
interface JwtPayload {
  user_id: string;
  username: string;
  admin: boolean;
  sub: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      // Authorization 헤더에서 Bearer 토큰 추출
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // JWT 시크릿 키
      secretOrKey: configService.get('JWT_SECRET'),
      // 토큰 검증 옵션
      ignoreExpiration: false,
    });
  }

  /**
   * JWT 토큰 검증 및 사용자 정보 반환
   * - 토큰의 유효성 검증
   * - 토큰 타입 확인 (access_token 만 허용)
   * - 사용자 정보를 request 객체에 주입
   * @param payload JWT 토큰 페이로드
   * @returns 사용자 정보 (request.user에 주입됨)
   * @throws UnauthorizedException 토큰이 유효하지 않을 때
   */
  async validate(payload: JwtPayload) {
    // 토큰 타입 검증 (access_token만 허용)
    if (payload.sub !== 'access_token') {
      throw new UnauthorizedException('Inavlid token type');
    }

    // 필수 사용자 정보 검증
    if (!payload.user_id || !payload.username) {
      throw new UnauthorizedException('Invalid token payload');
    }

    // 사용자 정보 반환 (request.user에 주입됨)
    return {
      user_id: payload.user_id,
      username: payload.username,
      admin: payload.admin,
    };
  }
}