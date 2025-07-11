import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from '../entities/bill.entity';
import { Cart } from '../entities/cart.entity';
import { CreateBillDto } from './dto/create-bill.dto';

/**
 * 청구서(Bill) 비즈니스 로직 서비스
 * 
 * 청구서와 관련된 모든 데이터베이스 작업과 비즈니스 로직을 처리합니다.
 * - 청구서 생성
 * - 청구서 조회
 * - 청구서 목록 조회
 * - 청구서 삭제
 * - 청구서 복원 (장바구니로 되돌리기)
 */
@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  /**
   * 청구서 생성
   * 
   * @description
   * - 사용자의 장바구니를 기반으로 청구서를 생성합니다
   * - 장바구니의 품목들을 청구서에 복사합니다
   * - 총 금액을 계산합니다
   * - 장바구니를 completed 상태로 변경합니다
   * 
   * @param userId - 사용자 ID
   * @param username - 사용자명
   * @param createBillDto - 청구서 생성 정보
   * @returns 생성된 청구서 정보
   * @throws 장바구니가 존재하지 않는 경우
   * 
   * @example
   * const bill = await billService.createBill('user-uuid', '홍길동', {
   *   title: '2024년 1월 청구서',
   *   hall: '대연홀',
   *   etc: '추가 요청사항'
   * });
   */
  async createBill(
    userId: string,
    username: string,
    createBillDto: CreateBillDto,
  ): Promise<Bill> {
    const { title, hall, etc } = createBillDto;

    // 사용자의 활성 장바구니 조회
    const cart = await this.cartRepository.findOne({
      where: { user_id: userId, deleted: false, completed: false },
      order: { created_at: 'DESC' },
    });

    if (!cart) {
      throw new NotFoundException('장바구니가 존재하지 않습니다.');
    }

    // 총 금액 계산
    let totalAmount = 0;
    cart.items.forEach((item) => {
      totalAmount += item.amount;
    });

    // 청구서 생성
    const bill = this.billRepository.create({
      title,
      hall,
      etc,
      username,
      user_id: userId,
      cart_id: cart.id,
      total_amount: totalAmount,
      items: cart.items,
    });

    // 청구서 저장
    const savedBill = await this.billRepository.save(bill);

    // 장바구니를 completed 상태로 변경
    await this.cartRepository.update(
      { id: cart.id },
      { completed: true }
    );

    return savedBill;
  }

  /**
   * 사용자의 청구서 목록 조회
   * 
   * @description
   * - 특정 사용자의 청구서 목록을 조회합니다
   * - 페이지네이션을 지원합니다
   * - 검색 기능을 지원합니다 (제목, 홀)
   * 
   * @param userId - 조회할 사용자 ID (선택사항)
   * @param title - 제목 검색 (선택사항)
   * @param hall - 홀 검색 (선택사항)
   * @param cursor - 커서 기반 페이지네이션 (선택사항)
   * @param limit - 조회할 개수 (기본값: 30)
   * @returns 청구서 목록
   * 
   * @example
   * const bills = await billService.findBills('user-uuid', '청구서', '대연홀');
   */
  async findBills(
    userId?: string,
    title?: string,
    hall?: string,
    cursor?: string,
    limit: number = 30,
  ): Promise<Bill[]> {
    const query = this.billRepository
      .createQueryBuilder('bills')
      .limit(limit)
      .orderBy('bills.created_at', 'DESC')
      .addOrderBy('bills.id', 'DESC');

    if (userId) {
      query.andWhere('bills.user_id = :userId', { userId });
    }

    if (title) {
      query.andWhere('bills.title LIKE :title', {
        title: `%${title}%`,
      });
    }

    if (hall) {
      query.andWhere('bills.hall LIKE :hall', {
        hall: `%${hall}%`,
      });
    }

    if (cursor) {
      const bill = await this.billRepository.findOne({
        where: { id: cursor },
      });

      if (!bill) {
        throw new NotFoundException('해당 청구서가 존재하지 않습니다.');
      }

      query.andWhere('bills.created_at < :date', {
        date: bill.created_at,
      });

      query.orWhere('bills.created_at = :date AND bills.id < :id', {
        date: bill.created_at,
        id: bill.id,
      });
    }

    return query.getMany();
  }

  /**
   * 청구서 상세 조회
   * 
   * @description
   * - 특정 청구서의 상세 정보를 조회합니다
   * 
   * @param id - 청구서 ID
   * @returns 청구서 정보
   * @throws 청구서가 존재하지 않는 경우
   * 
   * @example
   * const bill = await billService.findById('bill-uuid');
   */
  async findById(id: string): Promise<Bill> {
    const bill = await this.billRepository.findOne({
      where: { id },
    });

    if (!bill) {
      throw new NotFoundException('존재하지 않는 청구서입니다.');
    }

    return bill;
  }

  /**
   * 청구서 삭제
   * 
   * @description
   * - 특정 청구서를 삭제합니다
   * - 본인 또는 관리자만 삭제 가능합니다
   * 
   * @param id - 삭제할 청구서 ID
   * @param userId - 요청한 사용자 ID
   * @param isAdmin - 관리자 여부
   * @throws 권한이 없는 경우
   * 
   * @example
   * await billService.removeBill('bill-uuid', 'user-uuid', false);
   */
  async removeBill(id: string, userId: string, isAdmin: boolean = false): Promise<void> {
    const bill = await this.billRepository.findOne({
      where: { id },
    });

    if (!bill) {
      throw new NotFoundException('존재하지 않는 청구서입니다.');
    }

    if (userId !== bill.user_id && !isAdmin) {
      throw new UnauthorizedException('삭제 권한이 없습니다.');
    }

    await this.billRepository.delete(id);
  }

  /**
   * 청구서 복원 (장바구니로 되돌리기)
   * 
   * @description
   * - 청구서를 삭제하고 연결된 장바구니를 다시 활성화합니다
   * - 본인만 복원 가능합니다
   * 
   * @param id - 복원할 청구서 ID
   * @param userId - 요청한 사용자 ID
   * @returns 복원된 장바구니 정보
   * @throws 권한이 없는 경우
   * 
   * @example
   * const cart = await billService.restoreBill('bill-uuid', 'user-uuid');
   */
  async restoreBill(id: string, userId: string): Promise<Cart> {
    const bill = await this.billRepository.findOne({
      where: { id },
    });

    if (!bill) {
      throw new NotFoundException('존재하지 않는 청구서입니다.');
    }

    if (userId !== bill.user_id) {
      throw new UnauthorizedException('복원 권한이 없습니다.');
    }

    // 연결된 장바구니 조회
    const cart = await this.cartRepository.findOne({
      where: { id: bill.cart_id },
    });

    if (!cart) {
      throw new NotFoundException('존재하지 않는 장바구니입니다.');
    }

    // 장바구니를 다시 활성화
    await this.cartRepository.update(
      { id: cart.id },
      { completed: false }
    );

    // 청구서 삭제
    await this.billRepository.delete(id);

    // 업데이트된 장바구니 반환
    const updatedCart = await this.cartRepository.findOne({
      where: { id: cart.id },
    });

    if (!updatedCart) {
      throw new NotFoundException('장바구니 업데이트에 실패했습니다.');
    }

    return updatedCart;
  }
} 