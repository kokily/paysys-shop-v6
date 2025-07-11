import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from '../entities/bill.entity';
import { AddReserveDto } from './dto/add-reserve.dto';

/**
 * 예약금(Reserve) 비즈니스 로직 서비스
 * 
 * 예약금과 관련된 모든 데이터베이스 작업과 비즈니스 로직을 처리합니다.
 * - 예약금 추가
 * - 예약금 삭제
 */
@Injectable()
export class ReserveService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
  ) {}

  /**
   * 예약금 추가
   * 
   * @description
   * - 특정 청구서에 예약금을 추가합니다
   * - 청구서가 존재하는지 확인합니다
   * - 예약금을 업데이트합니다
   * 
   * @param addReserveDto - 예약금 추가 정보
   * @returns 업데이트된 청구서 정보
   * @throws 청구서가 존재하지 않는 경우
   * 
   * @example
   * const bill = await reserveService.addReserve({
   *   bill_id: 'bill-uuid',
   *   reserve: 10000
   * });
   */
  async addReserve(addReserveDto: AddReserveDto): Promise<Bill> {
    const { bill_id, reserve } = addReserveDto;

    // 청구서 존재 여부 확인
    const bill = await this.billRepository.findOne({
      where: { id: bill_id },
    });

    if (!bill) {
      throw new NotFoundException('존재하지 않는 청구서입니다.');
    }

    // 예약금 업데이트
    await this.billRepository.update(
      { id: bill_id },
      { reserve }
    );

    // 업데이트된 청구서 반환
    const updatedBill = await this.billRepository.findOne({
      where: { id: bill_id },
    });

    if (!updatedBill) {
      throw new NotFoundException('청구서 업데이트에 실패했습니다.');
    }

    return updatedBill;
  }

  /**
   * 예약금 삭제
   * 
   * @description
   * - 특정 청구서의 예약금을 삭제합니다 (0으로 설정)
   * - 청구서가 존재하는지 확인합니다
   * - 예약금이 있는지 확인합니다
   * 
   * @param billId - 예약금을 삭제할 청구서 ID
   * @returns 업데이트된 청구서 정보
   * @throws 청구서가 존재하지 않는 경우
   * @throws 예약금이 없는 경우
   * 
   * @example
   * const bill = await reserveService.removeReserve('bill-uuid');
   */
  async removeReserve(billId: string): Promise<Bill> {
    // 청구서 존재 여부 확인
    const bill = await this.billRepository.findOne({
      where: { id: billId },
    });

    if (!bill) {
      throw new NotFoundException('존재하지 않는 청구서입니다.');
    }

    // 예약금이 있는지 확인
    if (!bill.reserve || bill.reserve === 0) {
      throw new NotFoundException('예약금이 없습니다.');
    }

    // 예약금을 0으로 설정
    await this.billRepository.update(
      { id: billId },
      { reserve: 0 }
    );

    // 업데이트된 청구서 반환
    const updatedBill = await this.billRepository.findOne({
      where: { id: billId },
    });

    if (!updatedBill) {
      throw new NotFoundException('청구서 업데이트에 실패했습니다.');
    }

    return updatedBill;
  }

  /**
   * 청구서의 예약금 조회
   * 
   * @description
   * - 특정 청구서의 예약금 정보를 조회합니다
   * 
   * @param billId - 조회할 청구서 ID
   * @returns 청구서 정보 (예약금 포함)
   * @throws 청구서가 존재하지 않는 경우
   * 
   * @example
   * const bill = await reserveService.getReserve('bill-uuid');
   * console.log('예약금:', bill.reserve);
   */
  async getReserve(billId: string): Promise<Bill> {
    const bill = await this.billRepository.findOne({
      where: { id: billId },
    });

    if (!bill) {
      throw new NotFoundException('존재하지 않는 청구서입니다.');
    }

    return bill;
  }
} 