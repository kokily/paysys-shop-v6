import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(private notificationGateway: NotificationGateway) {}

  /**
   * 전표 생성 알림 전송
   * @param bill 생성된 전표 전송
   */
  sendBillCreateNotification(bill: any) {
    this.notificationGateway.sendBillNotification(bill);
  }

  sendUserNotification(userId: string, message: string) {
    this.notificationGateway.sendNotificationToUser(userId, message);
  }
}
