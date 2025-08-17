import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/types/jwt.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  /**
   * JWT 토큰 검증 및 사용자 정보 반환
   * - 토큰 유효성 검증
   * - 토큰 타입 확인(access_token 만 허용)
   * - 사용자 정보 request 객체에 주입
   * @param payload payload JWT 토큰 페이로드
   * @returns 사용자 정보 (request.user에 주입)
   * @throws UnauthorizedException 토큰이 유효하지 않을 때
   */
  async validate(payload: JwtPayload) {
    if (payload.sub !== 'access_token') {
      throw new UnauthorizedException('토큰 타입이 잘못되었습니다.');
    }

    if (!payload.user_id || !payload.username) {
      throw new UnauthorizedException('토큰 페이로드가 잘못되었습니다.');
    }

    return {
      user_id: payload.user_id,
      username: payload.username,
      admin: payload.admin,
    };
  }
}
