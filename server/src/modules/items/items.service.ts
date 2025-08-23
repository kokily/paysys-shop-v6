import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { Repository } from 'typeorm';
import { AddItemDto } from './dto/add-item.dto';
import { ListItemsDto } from './dto/list-items.dto';
import { UpdateItemDto } from './dto/update-item.dto';

const MESSAGE_404 = '해당 품목을 찾을 수 없습니다.';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>
  ) {}

  /**
   * 품목 생성
   * - 품목 번호(num) 자동 생성 (현재 개수 + 1)
   * - 모든 필수 필드 검증
   * @param addItemDto 품목 생성 정보
   * @returns 생성된 품목
   */
  async addItem(addItemDto: AddItemDto): Promise<Item> {
    const itemCount = await this.itemRepository.count();
    const item = this.itemRepository.create({
      ...addItemDto,
      num: itemCount + 1,
    });

    return await this.itemRepository.save(item);
  }

  /**
   * 품목 리스트 조회
   * - 일반 사용자 권한 필요
   * - 페이지네이션 (Cursor ID 기반, 30개씩)
   * - 다중 필터링 지원 (divide, native, name)
   * - num 역순 정렬
   * @param listItemsDto 조회 조건
   * @returns 품목 리스트
   */
  async findAll(listItemsDto: ListItemsDto): Promise<Item[]> {
    const { divide, native, name, cursor } = listItemsDto;

    const query = this.itemRepository.createQueryBuilder('items').limit(30).orderBy('items.num', 'DESC');

    if (divide) {
      query.andWhere('items.divide = :divide', { divide });
    }

    if (native) {
      query.andWhere('items.native = :native', { native });
    }

    if (name) {
      query.andWhere('items.name LIKE :name', { name: `%${name}%` });
    }

    if (cursor) {
      const cursorItem = await this.itemRepository.findOne({ where: { id: cursor } });

      if (!cursorItem) {
        throw new NotFoundException(MESSAGE_404);
      }

      query.andWhere('items.num < :num', { num: cursorItem.num });
    }

    return await query.getMany();
  }

  /**
   * 품목 상세 조회
   * - 일반 사용자 권한 필요
   * - ID로 특정 품목 조회
   * @param id 품목 ID (uuid)
   * @returns 품목 상세 정보
   */
  async findOne(id: string): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException(MESSAGE_404);
    }

    return item;
  }

  /**
   * 품목 삭제
   * - 관리자 권한 필요
   * - 물리적 삭제 (완전 제거)
   * - 관련된 카트/전표 데이터 확인 필요
   * @param id 품목 ID (uuid)
   * @returns 삭제 성공 메시지
   */
  async remove(id: string): Promise<{ message: string }> {
    const item = await this.itemRepository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException(MESSAGE_404);
    }

    await this.itemRepository.delete(id);

    return {
      message: '품목 삭제 성공',
    };
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

    Object.assign(item, updateItemDto);

    return await this.itemRepository.save(item);
  }
}
