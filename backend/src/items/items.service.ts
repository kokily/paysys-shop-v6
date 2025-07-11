import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../entities/item.entity';
import { ItemListQueryDto } from './dto/item-list-query.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

/**
 * 품목(Item) 비즈니스 로직 서비스
 * 
 * 품목과 관련된 모든 데이터베이스 작업과 비즈니스 로직을 처리합니다.
 * - 목록 조회 (필터링, 페이징 포함)
 * - 상세 조회
 * - 생성, 수정, 삭제
 */
@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  /**
   * 품목 목록 조회
   * 
   * @description
   * - 품목 목록을 조건에 따라 조회합니다
   * - 최대 30개씩 조회되며, 품목 번호(num) 기준 내림차순 정렬
   * - 식사 종류(divide), 회원 등급(native), 품목명(name)으로 필터링 가능
   * - 커서 기반 페이징 지원 (cursor 파라미터로 이전 페이지의 마지막 품목 ID 전달)
   * 
   * @param query - 조회 조건 객체
   * @param query.divide - 식사 종류 필터 (선택사항)
   * @param query.native - 회원 등급 필터 (선택사항)
   * @param query.name - 품목명 검색 필터 (선택사항, LIKE 검색)
   * @param query.cursor - 페이징 커서 (선택사항, 이전 페이지의 마지막 품목 ID)
   * @returns 품목 목록 배열
   * @throws 존재하지 않는 품목 ID가 cursor로 전달된 경우
   * 
   * @example
   * // 기본 조회
   * const items = await itemService.list({});
   * 
   * // 필터링 조회
   * const items = await itemService.list({ 
   *   divide: '식사(중식)', 
   *   native: '회원',
   *   name: '김치찌개'
   * });
   * 
   * // 페이징 조회
   * const items = await itemService.list({ cursor: 'last-item-id' });
   */
  async list(query: ItemListQueryDto) {
    const { divide, native, name, cursor } = query;
    const qb = this.itemRepository.createQueryBuilder('item')
      .limit(30)
      .orderBy('item.num', 'DESC');

    if (divide) {
      qb.andWhere('item.divide = :divide', { divide });
    }
    if (native) {
      qb.andWhere('item.native = :native', { native });
    }
    if (name) {
      qb.andWhere('item.name like :name', { name: `%${name}%` });
    }
    if (cursor) {
      const item = await this.itemRepository.findOne({ where: { id: cursor } });
      if (!item) throw new Error('존재하지 않는 품목입니다.');
      qb.andWhere('item.num < :num', { num: item.num });
    }
    return qb.getMany();
  }

  /**
   * 품목 상세 조회
   * 
   * @description
   * - 특정 품목의 상세 정보를 조회합니다
   * - 존재하지 않는 ID인 경우 null을 반환합니다
   * 
   * @param id - 조회할 품목 ID (UUID)
   * @returns 품목 정보 또는 null
   * 
   * @example
   * const item = await itemService.findOne('item-id');
   * if (item) {
   *   console.log(item.name, item.price);
   * }
   */
  async findOne(id: string): Promise<Item | null> {
    return this.itemRepository.findOne({ where: { id } });
  }

  /**
   * 품목 생성
   * 
   * @description
   * - 새로운 품목을 데이터베이스에 생성합니다
   * - TypeORM의 create와 save를 사용하여 엔티티를 생성하고 저장합니다
   * - 생성된 품목 정보를 반환합니다 (ID, 생성/수정 시간 포함)
   * 
   * @param createItemDto - 생성할 품목 정보
   * @param createItemDto.num - 품목 번호 (1 이상의 정수)
   * @param createItemDto.name - 품목명 (필수)
   * @param createItemDto.divide - 식사 종류 (필수)
   * @param createItemDto.native - 회원 등급 (필수)
   * @param createItemDto.unit - 단위 (필수)
   * @param createItemDto.price - 가격 (0 이상의 정수)
   * @returns 생성된 품목 정보
   * 
   * @example
   * const newItem = await itemService.create({
   *   num: 1001,
   *   name: '김치찌개',
   *   divide: '식사(중식)',
   *   native: '회원',
   *   unit: '인분',
   *   price: 8000
   * });
   */
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  /**
   * 품목 수정
   * 
   * @description
   * - 기존 품목의 정보를 수정합니다
   * - 존재하지 않는 품목 ID인 경우 에러를 발생시킵니다
   * - 부분 업데이트를 지원합니다 (전송된 필드만 수정)
   * - 수정된 품목 정보를 반환합니다
   * 
   * @param id - 수정할 품목 ID (UUID)
   * @param updateItemDto - 수정할 품목 정보 (선택적 필드)
   * @returns 수정된 품목 정보
   * @throws 존재하지 않는 품목 ID인 경우
   * 
   * @example
   * // 전체 필드 수정
   * const updatedItem = await itemService.update('item-id', {
   *   num: 1002,
   *   name: '김치찌개(대)',
   *   divide: '식사(중식)',
   *   native: '회원',
   *   unit: '인분',
   *   price: 10000
   * });
   * 
   * // 부분 수정
   * const updatedItem = await itemService.update('item-id', {
   *   name: '김치찌개(대)',
   *   price: 10000
   * });
   */
  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      throw new Error('존재하지 않는 품목입니다.');
    }
    
    Object.assign(item, updateItemDto);
    return this.itemRepository.save(item);
  }

  /**
   * 품목 삭제
   * 
   * @description
   * - 특정 품목을 데이터베이스에서 삭제합니다
   * - 존재하지 않는 품목 ID인 경우 에러를 발생시킵니다
   * - TypeORM의 remove 메서드를 사용하여 엔티티를 삭제합니다
   * 
   * @param id - 삭제할 품목 ID (UUID)
   * @throws 존재하지 않는 품목 ID인 경우
   * 
   * @example
   * await itemService.remove('item-id');
   */
  async remove(id: string): Promise<void> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      throw new Error('존재하지 않는 품목입니다.');
    }
    
    await this.itemRepository.remove(item);
  }
} 