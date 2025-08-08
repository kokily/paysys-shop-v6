import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "src/entities/item.entity";
import { Repository } from "typeorm";
import { CreateItemDto } from "./dto/create-item.dto";
import { ListItemsDto } from "./dto/list-items.dto";
import { UpdateItemDto } from "./dto/update-item.dto";

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  /**
   * 품목 생성
   * - 품목 번호(num) 자동 생성 (현재 개수 + 1)
   * - 모든 필수 필드 검증
   * @param createItemDto 품목 생성 정보
   * @returns 생성된 품목
   */
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const { name, divide, native, unit, price }  = createItemDto;

    // 현재 품목 개수 조회하여 번호 생성
    const itemCount = await this.itemRepository.count();

    const item = this.itemRepository.create({
      name, divide, native, unit, price,
      num: itemCount + 1,
    });

    return await this.itemRepository.save(item);
  }

  /**
   * 품목 리스트 조회
   * - 페이지네이션 (Cursor 기반, 30개씩)
   * - 다중 필터링 지원 (divide, native, name)
   * - num 역순 정렬
   * @param listItemsDto 조회 조건
   * @returns 품목 리스트 (최대 30개)
   */
  async findAll(listItemsDto: ListItemsDto): Promise<Item[]> {
    const { divide, native, name, cursor } = listItemsDto;

    const query = this.itemRepository
      .createQueryBuilder('items')
      .limit(30)
      .orderBy('items.num', 'DESC');

    // 구분 필터
    if (divide) {
      query.andWhere('items.divide = :divide', { divide });
    }

    // 대상 필터
    if (native) {
      query.andWhere('items.native = :native', { native });
    }

    // 품명 검색 (부분 일치)
    if (name) {
      query.andWhere('items.name LIKE :name', { name: `%${name}%`});
    }

    // 페이지네이션 (Cursor 기반)
    if (cursor) {
      const cursorItem = await this.itemRepository.findOne({
        where: { id: cursor }
      });

      if (!cursorItem) {
        throw new NotFoundException('Cursor 품목을 찾을 수 없습니다.');
      }

      query.andWhere('items.num < :num', { num: cursorItem.num });
    }

    return await query.getMany();
  }

  /**
   * 품목 상세 조회
   * - ID로 특정 품목 조회
   * - 존재하지 않으면 404 처리
   * @param id 품목 ID
   * @returns 품목 상세 정보
   */
  async findOne(id: string): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException('품목을 찾을 수 없습니다.');
    }

    return item;
  }

  /**
   * 품목 수정
   * - 부분 수정 지원 (제공된 필드만 업데이트)
   * - 품목 번호(num)은 수정 불가
   * - 존재하지 않으면 404 에러
   * @param id 품목 ID
   * @param updateItemDto 수정할 정보
   * @returns 수정된 품목 정보
   */
  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);

    // 부분 업데이트
    Object.assign(item, updateItemDto);

    return await this.itemRepository.save(item);
  }

  /**
   * 품목 삭제
   * - 물리적 삭제 (데이터베이스 완전 삭제)
   * - 존재하지 않으면 404 에러
   * - Todo: 관련 카트/전표 데이터 확인 로직 추가 필요
   * @param id 
   * @returns 
   */
  async remove(id: string): Promise<{ message: string }> {
    const item = await this.findOne(id);

    await this.itemRepository.remove(item);

    return {
      message: '품목이 삭제되었습니다.'
    }
  }
}