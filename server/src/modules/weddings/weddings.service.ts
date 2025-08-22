import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wedding } from 'src/entities/wedding.entity';
import { AddWeddingDto } from './dto/add-wedding.dto';
import { ListWeddingsDto } from './dto/list-weddings.dto';
import { UpdateWeddingDto } from './dto/update-wedding.dto';

@Injectable()
export class WeddingsService {
  constructor(
    @InjectRepository(Wedding)
    private readonly weddingsRepository: Repository<Wedding>
  ) {}

  private maskingName(name: string): string {
    if (typeof name !== 'string' || name.length === 0) {
      return '';
    }

    const length = name.length;
    if (length <= 2) {
      return name.slice(0, 1) + '*';
    }

    const firstChar = name.charAt(0);
    const lastChar = name.charAt(length - 1);
    const middleMask = '*'.repeat(length - 2);

    return firstChar + middleMask + lastChar;
  }

  /**
   * 웨딩 정보 생성
   * @param addWeddingDto 웨딩 생성 데이터
   * @returns 생성된 웨딩 정보
   */
  async addWedding(addWeddingDto: AddWeddingDto): Promise<Wedding> {
    const source = this.weddingsRepository.create(addWeddingDto);

    const wedding = {
      ...source,
      husband_name: this.maskingName(source.husband_name),
      bride_name: this.maskingName(source.bride_name),
    };

    return this.weddingsRepository.save(wedding);
  }

  /**
   * 웨딩 리스트 조회
   * - 전체 웨딩 리스트 조회
   * - 필터링 지원: 신랑/부 이름, 날짜 범위
   * - 페이지네이션 (Cursor 기반)
   * - 관리자만 조회 가능
   * @param listWeddingsDto 조회 조건
   * @param req 인증된 사용자 정보
   * @returns 웨딩 목록
   */
  async listWeddings(listWeddingsDto: ListWeddingsDto): Promise<Wedding[]> {
    const { limit = 30, cursor } = listWeddingsDto;
    const query = this.weddingsRepository
      .createQueryBuilder('weddings')
      .orderBy('weddings.created_at', 'DESC')
      .addOrderBy('weddings.id', 'DESC')
      .limit(limit);

    if (cursor) {
      const cursorWedding = await this.weddingsRepository.findOne({ where: { id: cursor } });

      if (!cursorWedding) {
        throw new NotFoundException('Cursor ID 전표를 찾을 수 없습니다.');
      }

      query.andWhere('weddings:id > :cursor', { cursor });
    }

    return await query.getMany();
  }

  /**
   * 웨딩 상세 조회
   * - 특정 웨딩의 상세 정보 조회
   * - 관리자만 조회 가능
   * @param id 웨딩 ID
   * @param req 인증된 사용자 정보
   * @returns 웨딩 상세 정보
   */
  async readWedding(id: string): Promise<Wedding> {
    const wedding = await this.weddingsRepository.findOne({ where: { id } });

    if (!wedding) {
      throw new NotFoundException('웨딩 전표를 찾을 수 없습니다.');
    }

    return wedding;
  }

  /**
   * 웨딩 정보 삭제
   * - 웨딩 정보 완전 삭제
   * - 관리자만 삭제 가능
   * @param id 웨딩 ID
   * @param req 인증된 사용자 정보
   * @returns 삭제 성공 메시지
   */
  async removeWedding(id: string): Promise<{ message: string }> {
    const wedding = await this.readWedding(id);

    await this.weddingsRepository.remove(wedding);

    return {
      message: '웨딩 전표가 삭제되었습니다.',
    };
  }

  /**
   * 웨딩 정보 수정
   * - 기존 웨딩 정보 업데이트
   * - 관리자만 수정 가능
   * @param id 웨딩 ID
   * @param updateWeddingDto 수정할 데이터
   * @param req 인증된 사용자 정보
   * @returns 수정된 웨딩 정보
   */
  async updateWedding(id: string, updateWeddingDto: UpdateWeddingDto): Promise<{ message: string }> {
    const wedding = await this.readWedding(id);

    Object.assign(wedding, updateWeddingDto);

    this.weddingsRepository.save(wedding);

    return {
      message: '웨딩 전표 수정 완료',
    };
  }
}
