import { Request, Response } from 'express';
import { PostService } from '../services/post.service';

export class DeletePostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
    this.deletePost = this.deletePost.bind(this); // Enlazar el método al contexto
  }

  public async deletePost(req: Request, res: Response): Promise<Response> {
    const postId = req.params.postId;
    try {
      await this.postService.deletePost(postId);
      return res.status(204).json();
    } catch (error) {
      console.log('Error deleting post:', error);
      return res.status(500).json({ error: 'Error deleting post' });
    }
  }
}
