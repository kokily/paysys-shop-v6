import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  /**
   * 사용자 연결 시 사용자 ID와 소켓 연결
   * - 클라이언트에서 사용자 ID로 방 참가
   * - 관리자는 'admin' 방에 자동 참가
   * @param client 소켓 클라이언트
   * @param userId 사용자 ID
   */
  @SubscribeMessage('join')
  handleJoin(client: Socket, userId: string) {
    client.join(`user_${userId}`);
    console.log(`User ${userId} joined notification room`);
  }
  
  /**
   * 관리자 연결
   * - 관리자 권한을 가진 사용자 admin 방에 추가
   * @param client 소켓 클라이언트
   */
  @SubscribeMessage('joinAdmin')
  handleJoinAdmin(client: Socket) {
    client.join('admin');
    console.log(`Admin joined admin notification room`);
  }

  /**
   * 특정 사용자에게 Toast 알림 전송
   * @param userId 사용자 ID
   * @param message 알림 메세지
   */
  sendNotificationToUser(userId: string, message: string) {
    this.server.to(`user_${userId}`).emit('toast-notification', {
      type: 'info',
      message: message,
      timestamp: new Date().toISOString(),
    });
  }

  sendBillNotification(bill: any) {
    this.server.to('admin').emit('toast-notification', {
      type: 'bill-created',
      message: `[${bill.username}]님 [${bill.hall}] [${bill.title}] 전표 등록!`,
      billId: bill.id,
      timestamp: new Date().toISOString(),
    });
  }
}
