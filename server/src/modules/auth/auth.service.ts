import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { AuthDto } from "./dto/auth.dto";
import { User } from "src/entities/user.entity";
import { Token } from "src/entities/token.entity";
import { JwtService } from "./jwt.service";

@Injectable()
export class AuthService {  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private jwtService: JwtService,
  ) {}

  /**
 * 관리자 사용자 여부 확인
 * @param username 사용자명
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
   * - 사용자명과 비밀번호 검증
   * - 기존 토큰 삭제 후 새 토큰 생성
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
    }
  }

  /**
   * 사용자 회원가입
   * - 중복 사용자명 검증
   * - 비밀번호 해시화
   * - 관리자 권한 자동 설정
   * 
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
   * 
   * @param userId 사용자 ID
   * @returns 로그아웃 성공 메시지
   */
  async logout(userId: string) {
    await this.tokenRepository.delete({ fk_user_id: userId });

    return {
      message: '로그아웃되었습니다.'
    }
  }

  /**
   * 인증 상태 확인
   * - JWT 미들웨어에서 처리되므로 임시 구현
   * - 나중에 JWT 미들웨어 구현 후 수정 예정
   * 
   * @returns 현재 사용자 정보
   */
  async check() {
    return {
      message: 'check - 구현 예정'
    }
  }
}