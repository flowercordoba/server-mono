import { NotificationService } from '@root/feactures/notifications/services/notification.service';
import { Server, Socket } from 'socket.io';

export let socketIONotificationObject: Server;

interface NotificationData {
  userId: string;
  message: string;
  type: 'friend-request' | 'friend-accept' | 'mention' | 'share';
}

export class SocketIONotificationHandler {
  private io: Server;
  private notificationService: NotificationService;

  constructor(io: Server) {
    this.io = io;
    this.notificationService = new NotificationService();
  }

  public listen(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on('sendNotification', async (data: NotificationData) => {
        try {
          const notification = await this.notificationService.createNotification(data);
          this.io.to(data.userId).emit('notification', notification);
        } catch (error) {
          console.error('Error sending notification:', error);
          socket.emit('error', 'Error sending notification');
        }
      });

      socket.on('joinRoom', (userId: string) => {
        socket.join(userId);
        console.log(`User joined room: ${userId}`);
      });

      socket.on('leaveRoom', (userId: string) => {
        socket.leave(userId);
        console.log(`User left room: ${userId}`);
      });

      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }
}
