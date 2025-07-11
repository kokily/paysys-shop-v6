import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ExpenseDto, UpdateExpenseDto } from './dto/expense.dto';
import { Wedding } from '../weddings/entities/wedding.entity';
import { Company } from '../weddings/entities/company.entity';
import { Convention } from '../weddings/entities/convention.entity';
import { Event } from '../weddings/entities/event.entity';
import { Hanbok } from '../weddings/entities/hanbok.entity';
import { Meal } from '../weddings/entities/meal.entity';
import { Present } from '../weddings/entities/present.entity';
import { Reserve } from '../weddings/entities/reserve.entity';
import { Prepayment } from '../weddings/entities/prepayment.entity';

@Injectable()
export class ExpenseService {
  constructor(
    private readonly dataSource: DataSource,
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

  async addExpense(dto: ExpenseDto): Promise<{ weddingId: string }> {
    return await this.dataSource.transaction(async manager => {
      // 1. Wedding 생성
      const wedding = this.weddingRepository.create({
        husband_name: dto.husband_name,
        bride_name: dto.bride_name,
        wedding_at: dto.wedding_at,
        event_at: dto.event_at,
        cost_husband: dto.cost_husband,
        cost_bride: dto.cost_bride,
        meal_husband: dto.meal_husband,
        meal_bride: dto.meal_bride,
        present_husband: dto.present_husband,
        present_bride: dto.present_bride,
        reserve_husband: dto.reserve_husband,
        reserve_bride: dto.reserve_bride,
      });
      const savedWedding = await manager.save(wedding);
      const weddingId = savedWedding.id;

      // 2. Company 생성
      const company = this.companyRepository.create({
        ...dto,
        weddingId,
      });
      await manager.save(company);

      // 3. Convention 생성
      const convention = this.conventionRepository.create({
        ...dto,
        weddingId,
      });
      await manager.save(convention);

      // 4. Event 생성
      const event = this.eventRepository.create({
        ...dto,
        weddingId,
      });
      await manager.save(event);

      // 5. Hanbok 생성
      const hanbok = this.hanbokRepository.create({
        ...dto,
        weddingId,
      });
      await manager.save(hanbok);

      // 6. Meal 생성
      const meal = this.mealRepository.create({
        ...dto,
        weddingId,
      });
      await manager.save(meal);

      // 7. Present 생성
      const present = this.presentRepository.create({
        ...dto,
        weddingId,
      });
      await manager.save(present);

      // 8. Reserve 생성
      const reserve = this.reserveRepository.create({
        ...dto,
        weddingId,
      });
      await manager.save(reserve);

      // 9. Prepayment 생성
      const prepayment = this.prepaymentRepository.create({
        ...dto,
        weddingId,
      });
      await manager.save(prepayment);

      return { weddingId };
    });
  }

  async updateExpense(dto: UpdateExpenseDto): Promise<void> {
    return await this.dataSource.transaction(async manager => {
      const { id } = dto;
      // 1. Wedding 수정
      await manager.update(Wedding, { id }, {
        husband_name: dto.husband_name,
        bride_name: dto.bride_name,
        wedding_at: dto.wedding_at,
        event_at: dto.event_at,
        cost_husband: dto.cost_husband,
        cost_bride: dto.cost_bride,
        meal_husband: dto.meal_husband,
        meal_bride: dto.meal_bride,
        present_husband: dto.present_husband,
        present_bride: dto.present_bride,
        reserve_husband: dto.reserve_husband,
        reserve_bride: dto.reserve_bride,
      });
      // 2. Company 수정
      await manager.update(Company, { weddingId: id }, { ...dto });
      // 3. Convention 수정
      await manager.update(Convention, { weddingId: id }, { ...dto });
      // 4. Event 수정
      await manager.update(Event, { weddingId: id }, { ...dto });
      // 5. Hanbok 수정
      await manager.update(Hanbok, { weddingId: id }, { ...dto });
      // 6. Meal 수정
      await manager.update(Meal, { weddingId: id }, { ...dto });
      // 7. Present 수정
      await manager.update(Present, { weddingId: id }, { ...dto });
      // 8. Reserve 수정
      await manager.update(Reserve, { weddingId: id }, { ...dto });
      // 9. Prepayment 수정
      await manager.update(Prepayment, { weddingId: id }, { ...dto });
    });
  }

  async removeExpense(id: string): Promise<void> {
    return await this.dataSource.transaction(async manager => {
      await manager.delete(Wedding, { id });
      await manager.delete(Convention, { weddingId: id });
      await manager.delete(Company, { weddingId: id });
      await manager.delete(Event, { weddingId: id });
      await manager.delete(Hanbok, { weddingId: id });
      await manager.delete(Meal, { weddingId: id });
      await manager.delete(Present, { weddingId: id });
      await manager.delete(Reserve, { weddingId: id });
      await manager.delete(Prepayment, { weddingId: id });
    });
  }
} 