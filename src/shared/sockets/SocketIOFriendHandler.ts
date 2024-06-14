import { FriendService } from '@root/feactures/friend/services/friend.service';
import { Server, Socket } from 'socket.io';

export let socketIOFriendObject: Server;

export class SocketIOFriendHandler {
  private io: Server;
  private friendService: FriendService;

  constructor(io: Server) {
    this.io = io;
    this.friendService = new FriendService();
  }

  public listen(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on('sendFriendRequest', async (data: { userId: string, friendId: string }) => {
        try {
          const friendRequest = await this.friendService.createFriendRequest(data);
          this.io.to(data.friendId).emit('friendRequest', friendRequest);
        } catch (error) {
          console.error('Error sending friend request:', error);
          socket.emit('error', 'Error sending friend request');
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
