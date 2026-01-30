import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { Token } from 'src/entities/token.entity';
import { User } from 'src/entities/user.entity';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private jwtService: JwtService
  ) {}

  /**
   * 관리자 사용자 여부 확인
   * @param username 사용자 이름
   * @returns 관리자 여부
   */
  private isAdminUser(username: string): boolean {
    const adminUsers = [
      process.env.ADMIN_NAME1,
      process.env.ADMIN_NAME2,
      process.env.ADMIN_NAME3,
      process.env.ADMIN_NAME4,
    ];

    return adminUsers.includes(username);
  }

  /**
   * 사용자 로그인
   * - 사용자명, 비밀번호 검증
   * - 기존 토큰 삭제 후 새 코튼 생성
   * - 보안을 위해 구체적인 에러 메시지 숨김
   * @param authDto 로그인 정보
   * @returns 사용자 정보와 토큰
   */
  async login(authDto: AuthDto) {
    const { username, password } = authDto;

    const user = await this.userRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 틀렸습니다.');
    }

    await this.tokenRepository.delete({ fk_user_id: user.id });

    const accessToken = this.jwtService.generateAccessToken({
      user_id: user.id,
      username: user.username,
      admin: user.admin,
    });

    const refreshToken = this.jwtService.generateRefreshToken({
      user_id: user.id,
      username: user.username,
      admin: user.admin,
      token_id: user.id,
    });

    await this.tokenRepository.save({
      fk_user_id: user.id,
      token: refreshToken,
    });

    return {
      user_id: user.id,
      username: user.username,
      admin: user.admin,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  /**
   * 사용자 회원가입 (관리자 권한)
   * - 중복 사용자명 검증
   * - 비밀번호 해싱
   * - 관리자 권한 자동 설정
   * @param authDto 회원가입 정보
   * @returns 생성된 사용자 정보
   */
  async register(authDto: AuthDto) {
    const { username, password } = authDto;

    // 중복 사용자 검증
    const exists = await this.userRepository.findOne({ where: { username } });

    if (exists) {
      throw new ConflictException('이미 사용중인 아이디입니다.');
    }

    const admin = this.isAdminUser(username);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({
        username,
        password: hashedPassword,
        admin,
      })
    );

    return {
      user_id: user.id,
      username: user.username,
      admin: user.admin,
    };
  }

  /**
   * 사용자 로그아웃
   * - DB에서 Refresh Token 삭제
   * - 토큰 무효화
   * @param userId 사용자 ID
   * @returns 로그아웃 성공 메시지
   */
  async logout(userId: string) {
    await this.tokenRepository.delete({ fk_user_id: userId });

    return {
      message: '로그아웃되었습니다.',
    };
  }

  /**
   * 인증 상태 확인
   * - JWT 미들웨어 처리
   * @param userId 사용자 ID
   * @returns 현재 사용자 정보
   */
  async check(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'username', 'admin'],
    });

    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }

    return {
      user_id: user.id,
      username: user.username,
      admin: user.admin,
    };
  }

  /**
   * Access Token 갱신
   * - Refresh Token을 사용, 새로운 Access Token 발급
   * - DB에 저장된 Refresh Token과 비교, 유효성 검증
   * @param refreshToken Refresh Token
   * @returns 새로운 Access Token
   */
  async refresh(refreshToken: string) {
    // DB에서 Refresh Token 조회
    const tokenEntity = await this.tokenRepository.findOne({
      where: { token: refreshToken }
    });

    if (!tokenEntity) {
      throw new UnauthorizedException('유효하지 않은 Refresh Token입니다.');
    }

    // Refresh Token 검증 및 새 Access Token 생성
    const decoded = this.jwtService.verifyRefreshToken(refreshToken);

    const newAccessToken = this.jwtService.generateAccessToken({
      user_id: decoded.user_id,
      username: decoded.username,
      admin: decoded.admin,
    });

    return {
      user_id: decoded.user_id,
      username: decoded.username,
      admin: decoded.admin,
      access_token: newAccessToken,
      refresh_token: refreshToken,
    };
  }
}
