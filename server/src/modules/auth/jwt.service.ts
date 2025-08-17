import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { AccessTokenPayload, RefreshTokenPayload } from 'src/types/jwt.types';

@Injectable()
export class JwtService {
  constructor(
    private jwtService: NestJwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Access Token 생성
   * - Authorization 헤더 전송 : XSS 공격 방지
   * - 1시간 만료 보안성과 사용성 균형
   * - subject, issuer, audience로 토큰 타입 검증 강화
   * @param payload payload 사용자 정보 (user_id, username, admin)
   * @returns JWT Access Token
   */
  generateAccessToken(payload: {
    user_id: string;
    username: string;
    admin: boolean;
  }) {
    return this.jwtService.sign(payload, {
      subject: 'access_token',
      expiresIn: '1h',
    });
  }

  /**
   * Refresh Token 생성
   * - HTTP Only 쿠키로 전송 CSRF 방지
   * - 30일 만료로 장기간 로그인 유지
   * - token_id를 포함해 토큰 무효화 추적 가능
   * @param payload payload 사용자 정보 + 토큰 ID
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
   * @param token token 검증할 Access Token
   * @returns 디코딩된 토큰 페이로드
   * @throws 잘못된 억세스 토큰 에러
   */
  verifyAccessToken(token: string): AccessTokenPayload {
    try {
      return this.jwtService.verify(token, {
        subject: 'access_token',
        issuer: 'paysys.kr',
        audience: 'paysys-client',
      });
    } catch (error) {
      throw new Error('잘못된 억세스 토큰');
    }
  }

  /**
   * Refresh Token 검증
   * - AccessToken과 동일한 보안 검증 적용
   * - RefreshToken 전용 subject 검증
   * - 토큰 갱신 시 사용
   * @param token 검증할 Refresh Token
   * @returns 디코딩된 토큰 페이로드
   * @throws 잘못된 리프레쉬 토큰 에러
   */
  verifyRefreshToken(token: string): RefreshTokenPayload {
    try {
      return this.jwtService.verify(token, {
        subject: 'refresh_token',
        issuer: 'paysys.kr',
        audience: 'paysys-client',
      });
    } catch (error) {
      throw new Error('잘못된 리프레쉬 토큰');
    }
  }

  /**
   * Access Token 갱신
   * - Refresh Token 사용 새로운 Access Token 생성
   * - 토큰 만료 시 자동 갱신 메커니즘
   * - 사용자 경험 개선 (재로그인 불필요)
   * @param refreshToken 유효한 Refresh Token
   * @returns 새로운 Access Token
   * @throws 잘못된 리프레쉬 토큰 에러
   */
  refreshAccessToken(refreshToken: string): string {
    const decoded: RefreshTokenPayload = this.verifyRefreshToken(refreshToken);

    return this.generateAccessToken({
      user_id: decoded.user_id,
      username: decoded.username,
      admin: decoded.admin,
    });
  }

  /**
   * 토큰 디코딩 (검증 없음)
   * - 토큰 내용 확인용
   * - 디버깅 목적으로 사용
   * @param token 디코딩할 토큰
   * @returns 디코딩된 토큰 페이로드
   */
  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}
