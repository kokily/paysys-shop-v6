import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wedding } from './entities/wedding.entity';
import { Company } from './entities/company.entity';
import { Convention } from './entities/convention.entity';
import { Event } from './entities/event.entity';
import { Hanbok } from './entities/hanbok.entity';
import { Meal } from './entities/meal.entity';
import { Present } from './entities/present.entity';
import { Reserve } from './entities/reserve.entity';
import { Prepayment } from './entities/prepayment.entity';

/**
 * 웨딩(Wedding) 비즈니스 로직 서비스
 * 
 * 웨딩과 관련된 모든 데이터베이스 작업과 비즈니스 로직을 처리합니다.
 * - 웨딩 목록 조회
 * - 웨딩 상세 조회
 */
@Injectable()
export class WeddingsService {
  constructor(
    @InjectRepository(Wedding)
    private readonly weddingRepository: Repository<Wedding>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Convention)
    private readonly conventionRepository: Repository<Convention>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Hanbok)
    private readonly hanbokRepository: Repository<Hanbok>,
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
    @InjectRepository(Present)
    private readonly presentRepository: Repository<Present>,
    @InjectRepository(Reserve)
    private readonly reserveRepository: Repository<Reserve>,
    @InjectRepository(Prepayment)
    private readonly prepaymentRepository: Repository<Prepayment>,
  ) {}

  /**
   * 웨딩 목록 조회
   * 
   * @description
   * - 웨딩 목록을 조회합니다
   * - 페이지네이션을 지원합니다
   * - 날짜 검색 기능을 지원합니다
   * 
   * @param date - 날짜 검색 (선택사항)
   * @param cursor - 커서 기반 페이지네이션 (선택사항)
   * @param limit - 조회할 개수 (기본값: 40)
   * @returns 웨딩 목록
   * 
   * @example
   * const weddings = await weddingsService.findWeddings('2024-06', 'cursor-uuid', 20);
   */
  async findWeddings(
    date?: string,
    cursor?: string,
    limit: number = 40,
  ): Promise<Wedding[]> {
    const query = this.weddingRepository
      .createQueryBuilder('weddings')
      .limit(limit)
      .orderBy('weddings.created_at', 'DESC')
      .addOrderBy('weddings.id', 'DESC');

    if (date) {
      query.andWhere('weddings.wedding_at LIKE :date', {
        date: `%${date}%`,
      });
    }

    if (cursor) {
      const wedding = await this.weddingRepository.findOne({
        where: { id: cursor },
      });

      if (!wedding) {
        throw new NotFoundException('해당 웨딩이 존재하지 않습니다.');
      }

      query.andWhere('weddings.created_at < :date', {
        date: wedding.created_at,
      });

      query.orWhere('weddings.created_at = :date AND weddings.id < :id', {
        date: wedding.created_at,
        id: wedding.id,
      });
    }

    return query.getMany();
  }

  /**
   * 웨딩 상세 조회
   * 
   * @description
   * - 특정 웨딩의 상세 정보를 조회합니다
   * - 관련된 모든 엔티티 정보를 포함합니다
   * 
   * @param id - 웨딩 ID
   * @returns 웨딩 상세 정보
   * @throws 웨딩이 존재하지 않는 경우
   * 
   * @example
   * const weddingDetail = await weddingsService.findById('wedding-uuid');
   */
  async findById(id: string): Promise<{
    wedding: Wedding;
    convention: Convention;
    company: Company;
    event: Event;
    hanbok: Hanbok;
    meal: Meal;
    present: Present;
    reserve: Reserve;
    prepayment: Prepayment | null;
  }> {
    const wedding = await this.weddingRepository.findOne({
      where: { id },
    });

    if (!wedding) {
      throw new NotFoundException('존재하지 않는 웨딩입니다.');
    }

    const convention = await this.conventionRepository.findOne({
      where: { weddingId: id },
    });

    const company = await this.companyRepository.findOne({
      where: { weddingId: id },
    });

    const event = await this.eventRepository.findOne({
      where: { weddingId: id },
    });

    const hanbok = await this.hanbokRepository.findOne({
      where: { weddingId: id },
    });

    const meal = await this.mealRepository.findOne({
      where: { weddingId: id },
    });

    const present = await this.presentRepository.findOne({
      where: { weddingId: id },
    });

    const reserve = await this.reserveRepository.findOne({
      where: { weddingId: id },
    });

    const prepayment = await this.prepaymentRepository.findOne({
      where: { weddingId: id },
    });

    if (
      !convention ||
      !company ||
      !event ||
      !hanbok ||
      !meal ||
      !present ||
      !reserve
    ) {
      throw new NotFoundException('존재하지 않는 웨딩입니다.');
    }

    return {
      wedding,
      convention,
      company,
      event,
      hanbok,
      meal,
      present,
      reserve,
      prepayment,
    };
  }
} 