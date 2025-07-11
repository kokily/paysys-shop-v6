import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async list({ username, cursor }: { username?: string; cursor?: string }) {
    let qb: SelectQueryBuilder<User> = this.userRepository.createQueryBuilder('user')
      .limit(20)
      .orderBy('user.created_at', 'DESC')
      .addOrderBy('user.id', 'DESC');

    if (username) {
      qb = qb.andWhere('user.username like :username', { username: `%${username}%` });
    }
    if (cursor) {
      const user = await this.userRepository.findOne({ where: { id: cursor } });
      if (!user) throw new Error('존재하지 않는 사용자입니다.');
      qb = qb.andWhere('user.created_at < :date', { date: user.created_at })
        .orWhere('user.created_at = :date AND user.id = :id', { date: user.created_at, id: user.id });
    }
    return qb.getMany();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async setAdmin(id: string, isAdmin: boolean): Promise<void> {
    await this.userRepository.update(id, { admin: isAdmin, updated_at: new Date() });
  }

  async changePassword(id: string, password: string): Promise<void> {
    const hashed = await bcrypt.hash(password, 10);
    await this.userRepository.update(id, { password: hashed });
  }
} 