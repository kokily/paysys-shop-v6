import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from 'src/entities/bill.entity';
import { Repository } from 'typeorm';
import { AddBillDto } from './dto/add-bill.dto';
import { Cart } from 'src/entities/cart.entity';
import { BILL_404_MESSAGE, CART_404_MESSAGE, FORBIDDEN_403_MESSAGE } from './bills.controller';
import { ListBillsDto } from './dto/list-bills.dto';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>
  ) {}

  /**
   * 전표 생성
   * - 현재 사용자의 카트를 기반으로 전표 생성
   * - 카트 품목들의 총액 계산
   * - 카트 completed 상태로 변경
   * - Toast 알림 발송 (특정 사용자) -> Todo..
   * @param userId 사용자 ID
   * @param username 사용자 이름
   * @param addBillDto 생성 조건
   * @returns 생성된 빌지
   */
  async addBill(userId: string, username: string, addBillDto: AddBillDto): Promise<Bill> {
    // 현 사용자 카트 조회
    const currentCart = await this.cartRepository.findOne({
      where: {
        user_id: userId,
        deleted: false,
      },
    });

    if (!currentCart) {
      throw new NotFoundException(CART_404_MESSAGE);
    }

    // 총액 계산
    const totalAmount = currentCart.items.reduce((sum, item) => sum + item.amount, 0);

    // 전표 생성
    const bill = this.billRepository.create({
      ...addBillDto,
      username,
      user_id: userId,
      cart_id: currentCart.id,
      total_amount: totalAmount,
      items: currentCart.items,
    });

    // 전표 저장
    const savedBill = await this.billRepository.save(bill);

    // 카트를 completed 상태로 변경
    currentCart.completed = true;

    await this.cartRepository.save(currentCart);

    // Todo- Notification

    return savedBill;
  }

  /**
   * 전표 리스트 조회
   * - 전체 전표 목록 조회
   * - 필터링 지원: title, hall, userId
   * - Cursor ID 기반 페이지네이션
   * @param listBillsDto 조회 조건
   * @returns 전표 리스트
   */
  async findAll(listBillsDto: ListBillsDto): Promise<Bill[]> {
    const { title, hall, userId, cursor } = listBillsDto;

    const query = this.billRepository
      .createQueryBuilder('bills')
      .limit(30)
      .orderBy('bills.created_at', 'DESC')
      .addOrderBy('bills.id', 'DESC');

    // 각 필터별 조건 추가
    if (title) {
      query.andWhere('bills.title LIKE :title', { title: `%${title}%` });
    }

    if (hall) {
      query.andWhere('bills.hall LIKE :hall', { hall: `%${hall}%` });
    }

    if (userId) {
      query.andWhere('bills.user_id = :user_id', { user_id: userId });
    }

    // Cursor 페이지 네이션
    if (cursor) {
      const cursorBill = await this.billRepository.findOne({ where: { id: cursor } });

      if (!cursorBill) {
        throw new NotFoundException(BILL_404_MESSAGE);
      }

      query.andWhere('(bills.created_at < :date OR (bills.created_at = :date AND bills.id < :id))', {
        date: cursorBill.created_at,
        id: cursorBill.id,
      });
    }

    return await query.getMany();
  }

  /**
   * 전표 상세 조회
   * - 특정 전표 상세 정보 조회
   * @param id 전표 ID
   * @returns 전표 상세 정보
   */
  async findOne(id: string): Promise<Bill> {
    const bill = await this.billRepository.findOne({ where: { id } });

    if (!bill) {
      throw new NotFoundException(BILL_404_MESSAGE);
    }

    return bill;
  }

  /**
   * 전표 삭제
   * - 물리적 제거 (완전 삭제)
   * - 본인 작성 전표 또는 관리자의 경우 삭제 가능
   * @param id 전표 ID
   * @param userId 사용자 ID
   * @param isAdmin 사용자 권한여부
   * @returns 삭제 성공 메시지
   */
  async remove(id: string, userId: string, isAdmin: boolean): Promise<{ message: string }> {
    const bill = await this.billRepository.findOne({ where: { id } });

    if (!bill) {
      throw new NotFoundException(BILL_404_MESSAGE);
    }

    // 권한 확인
    if (bill.user_id !== userId && !isAdmin) {
      throw new ForbiddenException(FORBIDDEN_403_MESSAGE);
    }

    await this.billRepository.delete(id);

    return {
      message: '전표가 삭제되었습니다.',
    };
  }

  /**
   * 전표 -> 카트 되돌리기
   * - 전표 삭제 후 연결된 카트 completed = false로 변경
   * - 본인이 작성한 전표만 가능
   * @param id 전표 ID
   * @param userId userId 현재 접속자의 ID
   * @returns 복원된 카트 정보
   */
  async restore(id: string, userId: string): Promise<Cart> {
    const bill = await this.billRepository.findOne({ where: { id } });

    if (!bill) {
      throw new NotFoundException(BILL_404_MESSAGE);
    }

    // 권한 확인
    if (bill.user_id !== userId) {
      throw new ForbiddenException(FORBIDDEN_403_MESSAGE);
    }

    // 연결된 카트 조회
    const cart = await this.cartRepository.findOne({ where: { id: bill.cart_id } });

    if (!cart) {
      throw new NotFoundException(CART_404_MESSAGE);
    }

    cart.completed = false;

    await this.cartRepository.save(cart);
    await this.billRepository.delete(id);

    return cart;
  }
}
