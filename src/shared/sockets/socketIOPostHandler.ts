import { CreatePostDto } from '@root/feactures/post/dto/post.create.dto';
import { UpdatePostDto } from '@root/feactures/post/dto/post.update.dto';
import { IPostDocument } from '@root/feactures/post/interfaces/post.interface';
import { PostService } from '@root/feactures/post/services/post.service';
import { Server, Socket } from 'socket.io';

export let socketIOPostObject: Server;

export class SocketIOPostHandler {
  private io: Server;
  private postService: PostService;

  constructor(io: Server) {
    this.io = io;
    this.postService = new PostService();
    socketIOPostObject = io; // Asegurando la inicialización del objeto de socket
  }

  public listen(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on('createPost', async (data: CreatePostDto) => {
        try {
          const newPost: IPostDocument = await this.postService.createPost(data);
          this.io.emit('postCreated', newPost);
        } catch (error) {
          console.error('Error creating post:', error);
          socket.emit('error', 'Error creating post');
        }
      });

      socket.on('updatePost', async (postId: string, data: UpdatePostDto) => {
        try {
          const updatedPost: IPostDocument | null = await this.postService.updatePost(postId, data);
          if (updatedPost) {
            this.io.emit('postUpdated', updatedPost);
          } else {
            socket.emit('error', 'Post not found');
          }
        } catch (error) {
          console.error('Error updating post:', error);
          socket.emit('error', 'Error updating post');
        }
      });

      socket.on('deletePost', async (postId: string) => {
        try {
          await this.postService.deletePost(postId);
          this.io.emit('postDeleted', postId);
        } catch (error) {
          console.error('Error deleting post:', error);
          socket.emit('error', 'Error deleting post');
        }
      });

      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }
}
