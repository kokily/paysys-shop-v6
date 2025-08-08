import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bill } from "src/entities/bill.entity";
import { Cart } from "src/entities/cart.entity";
import { Repository } from "typeorm";
import { CreateBillDto } from "./dto/create-bill.dto";
import { ListBillsDto } from "./dto/list-bills.dto";
import { NotificationService } from "../notifications/notification.service";

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private notificationService: NotificationService,
  ) {}

  /**
   * 전표 생성
   * - 현재 사용자의 카트를 기반으로 전표 생성
   * - 카트 품목들의 총액 계산
   * - 카트 completed 상태로 변경
   * - Toast 알림 발송 (특정 사용자)
   * @param userId 
   * @param username 
   * @param createBillDto 
   * @returns 
   */
  async create(userId: string, username: string, createBillDto: CreateBillDto): Promise<Bill> {
    const { title, hall, etc } = createBillDto;

    // 현 사용자 카트 조회
    const cart = await this.cartRepository.findOne({
      where: {
        user_id: userId,
        deleted: false,
      },
    });

    if (!cart) {
      throw new NotFoundException('카트가 존재하지 않습니다.');
    }

    // 총액 계산
    let totalAmount = 0;

    cart.items.forEach(item => {
      totalAmount += item.amount;
    });

    // 전표 생성
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

    // 전표 저장
    const savedBill = await this.billRepository.save(bill);

    // 카트를 completed 상태로 변경
    cart.completed = true;

    await this.cartRepository.save(cart);

    // 관리자에게 Notification 전송
    this.notificationService.sendBillCreateNotification(savedBill);

    return savedBill;
  }

  /**
   * 
   * @param listBillsDto 
   * @returns 
   */
  async findAll(listBillsDto: ListBillsDto): Promise<Bill[]> {
    const { user_id, title, hall, cursor } = listBillsDto;

    const query = this.billRepository 
      .createQueryBuilder('bills')
      .limit(30)
      .orderBy('bills.created_at', 'DESC')
      .addOrderBy('bills.id', 'DESC');

    // 사용자 필터
    if (user_id) {
      query.andWhere('bills.user_id = :user_id', { user_id });
    }

    // 제목 검색
    if (title) {
      query.andWhere('bills.title LIKE :title', { title: `%${title}%` });
    }

    // 행사장소 검색
    if (hall) {
      query.andWhere('bills.hall LIKE :hall', { hall: `%${hall}%` });
    }

    // 페이지네이션 (Cursor 기반)
    if (cursor) {
      const cursorBill = await this.billRepository.findOne({ where: { id: cursor } });

      if (!cursorBill) {
        throw new NotFoundException('커서 전표를 찾을 수 없습니다.');
      }

      query.andWhere(
        '(bills.created_at < :date OR (bills.created_at = :date AND bills.id < :id))', {
          date: cursorBill.created_at,
          id: cursorBill.id,
        }
      );
    }

    return await query.getMany();
  }

  /**
   * 전표 상세 조회
   * - 특정 전표의 상세 정보 조회
   * @param id 전표 ID
   * @param userId 사용자 ID (권한 확인용)
   * @returns 전표 상세 정보
   */
  async findOne(id: string, userId: string): Promise<Bill> {
    const bill = await this.billRepository.findOne({ where: { id } });

    if (!bill) {
      throw new NotFoundException('존재하지 않는 전표입니다.');
    }

    return bill;
  }

  /**
   * 전표 삭제
   * - 물리적 삭제 (완전 제거)
   * - 본인 작성 전표 또는 관리자일 경우 삭제 가능
   * @param id 
   * @param userId 
   * @param isAdmin 
   * @returns 
   */
  async remove(id: string, userId: string, isAdmin: boolean): Promise<{ message: string }> {
    const bill = await this.billRepository.findOne({ where: { id } });

    if (!bill) {
      throw new NotFoundException('존재하지 않는 전표입니다.');
    }

    // 권한 확인
    if (bill.user_id !== userId && !isAdmin) {
      throw new ForbiddenException('삭제 권한이 없습니다.');
    }

    await this.billRepository.delete(id);

    return {
      message: '전표가 삭제되었습니다.'
    };
  }

  /**
   * 전표 -> 카트로 되돌리기
   * - 전표를 삭제하고 연결된 카트를 completed = false로 변경
   * - 본인이 작성한 전표만 가능
   * @param id 전표 ID
   * @param userId 인증된 사용자 ID
   * @returns 복원된 카트 정보
   */
  async restore(id: string, userId: string): Promise<Cart> {
    const bill = await this.billRepository.findOne({ where: { id } });

    if (!bill) {
      throw new NotFoundException('존재하지 않는 전표입니다.');
    }

    // 권한 확인
    if (bill.user_id !== userId) {
      throw new ForbiddenException('전표 수정 권한이 없습니다.');
    }

    // 연결된 카트 조회
    const cart = await this.cartRepository.findOne({ where: { id: bill.cart_id } });

    if (!cart) {
      throw new NotFoundException('존재하지 않는 카트입니다.');
    }

    // 카트를 completed = false로 변경
    cart.completed = false;

    // 카트는 미완료, 빌지는 삭제
    await this.cartRepository.save(cart);
    await this.billRepository.delete(id);

    return cart;
  }
}