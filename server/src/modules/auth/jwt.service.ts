import { Injectable } from "@nestjs/common";
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// 토큰 페이로드 타입 정의
interface AccessTokenPayload {
  user_id: string;
  username: string;
  admin: boolean;
  sub: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
}

interface RefreshTokenPayload {
  user_id: string;
  username: string;
  admin: boolean;
  token_id: string;
  sub: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtService {
  constructor(
    private jwtService: NestJwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Access Token 생성
   * - Authorization 헤더 전송으로 XSS 공격 방지
   * - 1시간 만료로 보안성과 사용성의 균형 유지
   * - subject, issuer, audience로 토큰 타입 검증 강화
   * @param payload 사용자 정보 (user_id, username, admin)
   * @returns JWT Access Token
   */
  generateAccessToken(
    payload: {
      user_id: string;
      username: string;
      admin: boolean;
    }
  ) {
    return this.jwtService.sign(payload, {
      subject: 'access_token',
      expiresIn: '1h',
    });
  }

  /**
   * Refresh Token 생성
   * - HTTP Only 쿠키로 전송 CSRF 공격 방지
   * - 30일 만료로 장기간 로그인 유지
   * - token_id를 포함하여 토큰 무효화 추적 가능
   * @param payload 사용자 정보 + 토큰 ID
   * @returns JWT Refresh Token
   */
  generateRefreshToken(payload: {
    user_id: string;
    username: string;
    admin: boolean;
    token_id: string;
  }) {
    return this.jwtService.sign(payload, {
      subject: 'refresh_token',
      expiresIn: '30d',
      issuer: 'paysys.kr',
      audience: 'paysys-client',
    });
  }

  /**
   * Access Token 검증
   * - subject, issuer, audience 모두 검증 토큰 타입 보장
   * - 만료 시간 자동 검증
   * - 서명 무결성 검증
   * @param token 검증할 Access Token
   * @returns 디코딩된 토큰 페이로드
   * @throws Invalid access token 에러
   */
  verifyAccessToken(token: string): AccessTokenPayload {
    try {
      return this.jwtService.verify(token, {
        subject: 'access_token',
        issuer: 'paysys.kr',
        audience: 'paysys-client',
      });
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  /**
   * Refresh Token 검증
   * - Access Token과 동일한 보안 검증 적용
   * - Refresh Token 전용 subject 검증
   * - 토큰 갱신 시 사용
   * @param token 검증할 Refresh Token
   * @returns 디코딩된 토큰 페이로드
   * @throws Invalid refresh token 에러
   */
  verifyRefreshToken(token: string): RefreshTokenPayload {
    try {
      return this.jwtService.verify(token, {
        subject: 'refresh_token',
        issuer: 'paysys.kr',
        audience: 'paysys-client',
      });
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  /**
   * Access Token 갱신
   * - Refresh Token 사용 새로운 Access Token 생성
   * - 토큰 만료 시 자동 갱신 메커니즘
   * - 사용자 경험 개선 (재로그인 불필요)
   * @param refreshToken 유효한 Refresh Token
   * @returns 새로운 Access Token
   * @throws Invalid refresh token 에러
   */
  refreshAcessToken(refreshToken: string): string {
    const decoded: RefreshTokenPayload = this.verifyRefreshToken(refreshToken);

    return this.generateAccessToken({
      user_id: decoded.user_id,
      username: decoded.username,
      admin: decoded.admin,
    });
  }

  /**
   * 토큰 디코딩 (검증 없음)
   * - 토큰 내용 확인용 (검증하지 않음)
   * - 주로 디버깅이나 로깅 목적으로 사용
   * - 보안이 중요한 곳에서는 verify 메서드 사용 권장
   * @param token 디코딩할 토큰
   * @returns 디코딩된 토큰 페이로드 (검증되지 않음)
   */
  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}

