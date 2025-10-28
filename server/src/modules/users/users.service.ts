import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { ListUsersDto } from './dto/list-users.dto';
import { SetAdminDto } from './dto/set-admin.dto';

type UserWithoutPassword = Omit<User, 'password'>;

const MESSAGE_404 = '존재하지 않는 사용자입니다.';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  private withOutPassword(user: User): UserWithoutPassword {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * 사용자 목록 조회
   * - 전체 사용자 목록 조회
   * - 페이지네이션 (Cursor 기반, 30개씩)
   * - 생성일 역순 정렬
   * - 비밀번호 제회 반환
   * @param listUsersDto listUsersDto 조회 조건
   * @returns 사용자 목록 (비밀번호 제외)
   */
  async findAll(listUsersDto: ListUsersDto): Promise<UserWithoutPassword[]> {
    const { cursor } = listUsersDto;

    const query = this.userRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.username', 'users.admin', 'users.created_at', 'users.updated_at'])
      .limit(30)
      .orderBy('users.created_at', 'DESC')
      .addOrderBy('users.id', 'DESC');

    // 페이지네이션 Cursor 기반
    if (cursor) {
      const cursorUser = await this.userRepository.findOne({ where: { id: cursor } });

      if (!cursorUser) {
        throw new NotFoundException(MESSAGE_404);
      }

      query.andWhere('(users.created_at < :date OR (users.created_at = :date AND users.id < :id', {
        date: cursorUser.created_at,
        id: cursorUser.id,
      });
    }

    const users = await query.getMany();

    return users.map((user) => {
      return this.withOutPassword(user);
    });
  }

  /**
   * 특정 사용자 상세 조회
   * - 특정 사용자의 상세 정보 조회
   * - 비밀번호 제외 반환
   * @param id 사용자 ID
   * @returns 사용자 상세 정보 (비밀번호 제외)
   */
  async findOne(id: string): Promise<UserWithoutPassword> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(MESSAGE_404);
    }

    return this.withOutPassword(user);
  }

  /**
   * 사용자 삭제
   * - 물리적 제거 (완전 제거)
   * - 관련 데이터도 함께 삭제됨 (CASCADE)
   * @param id 사용자 ID
   * @returns 삭제 성공 메시지
   */
  async remove(id: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(MESSAGE_404);
    }

    await this.userRepository.delete(id);

    return {
      message: '사용자가 삭제되었습니다.',
    };
  }

  /**
   * 관리자 권한 설정
   * - 특정 사용자 관리자 권한 설정/해제
   * @param id 사용자 ID
   * @param isAdmin 관리자 권한 여부
   * @returns 설정 성공 메시지
   */
  async setAdmin(setAdminDto: SetAdminDto): Promise<{ message: string }> {
    const { id, isAdmin } = setAdminDto;

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(MESSAGE_404);
    }

    user.admin = isAdmin;

    await this.userRepository.save(user);

    return {
      message: `사용자 ${user.username}의 관리자 권한이 ${isAdmin ? '설정' : '해제'} 되었습니다.`,
    };
  }

  /**
   * 비밀번호 변경
   * - 현재 로그인한 사용자의 비밀번호 변경 (req.user)
   * - 새 비밀번호 해시화 후 저장
   * @param userId 접속 사용자 ID (req.user.user_id)
   * @param newPassword 새 비밀번호
   * @returns 변경 성공 메시지
   */
  async changePassword(userId: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(MESSAGE_404);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await this.userRepository.save(user);

    return {
      message: '비밀번호가 변경되었습니다.',
    };
  }

  /**
   * 비밀번호 초기화(관리자)
   * @param userId 대상 사용자 ID
   * @returns 변경 성공 메시지
   */
  async initPassword(userId: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(MESSAGE_404);
    }

    const hashedPassword = await bcrypt.hash('123456', 10);

    user.password = hashedPassword;

    await this.userRepository.save(user);

    return {
      message: '비밀번호가 초기화되었습니다(123456)',
    };
  }
}
