import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wedding } from "src/entities/wedding.entity";
import { CreateWeddingDto } from "./dto/create-wedding.dto";
import { ListWeddingsDto } from "./dto/list-weddings.dto";
import { UpdateWeddingDto } from "./dto/update-wedding.dto";

@Injectable()
export class WeddingsService {
  constructor(
    @InjectRepository(Wedding)
    private readonly weddingRepository: Repository<Wedding>,
  ) {}

  private maskingName(name: string): string {
    if (name.length > 2) {
      let originalName = name.split('');
  
      originalName.map((_, i) => {
        if (i === 0 || i === originalName.length - 1) return;
  
        originalName[i] = '*';
      });
  
      let combineName = originalName.join();
  
      return combineName.replace(/,/g, '');
    } else {
      return name.replace(/.$/, '*');
    }
  }

  /**
   * 웨딩 정보 생성
   * @param createWeddingDto 웨딩 생성 데이터
   * @returns 생성된 웨딩 정보
   */
  async create(createWeddingDto: CreateWeddingDto): Promise<Wedding> {
    const source = this.weddingRepository.create(createWeddingDto);

    const wedding = {
      ...source,
      husband_name: this.maskingName(source.husband_name),
      bride_name: this.maskingName(source.bride_name),
    };

    return this.weddingRepository.save(wedding);
  }

  /**
   * 웨딩 리스트 조회
   * @param listWeddingsDto 조회 조건
   * @returns 웨딩 리스트
   */
  async findAll(listWeddingsDto: ListWeddingsDto): Promise<Wedding[]> {
    const { limit = 10, cursor } = listWeddingsDto;

    const query = this.weddingRepository.createQueryBuilder('wedding')

    if (cursor) {
      query.andWhere('wedding.id > :cursor', { cursor });
    }

    query
      .orderBy('wedding.wedding_at', 'DESC') 
      .addOrderBy('wedding.id', 'ASC')
      .limit(limit);

    return query.getMany();
  }

  /**
   * 웨딩 상세 조회
   * @param id 웨딩 ID
   * @returns 웨딩 상세 정보
   */
  async findOne(id: string): Promise<Wedding> {
    const wedding = await this.weddingRepository.findOne({
      where: { id }
    });

    if (!wedding) {
      throw new NotFoundException('웨딩을 찾을 수 없습니다.');
    }

    return wedding;
  }

  /**
   * 웨딩 정보 수정
   * @param id 웨딩 ID
   * @param updateWeddingDto 수정할 데이터
   * @returns 수정된 웨딩 정보
   */
  async update(id: string, updateWeddingDto: UpdateWeddingDto): Promise<Wedding> {
    const wedding = await this.findOne(id);

    Object.assign(wedding, updateWeddingDto);

    return this.weddingRepository.save(wedding);
  }

  /**
   * 웨딩 정보 삭제
   * @param id 웨딩 ID
   * @returns 삭제 성공 메시지
   */
  async remove(id: string): Promise<{ message: string }> {
    const wedding = await this.findOne(id);

    await this.weddingRepository.remove(wedding);

    return {
      message: '웨딩 정보가 삭제되었습니다.'
    };
  }
}