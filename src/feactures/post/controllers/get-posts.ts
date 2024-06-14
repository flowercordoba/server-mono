import { Request, Response } from 'express';
import { PostService } from '../services/post.service';

interface CustomRequest extends Request {
  userId?: string;
}

export class GetPostsController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
    this.getPostsByUser = this.getPostsByUser.bind(this);
    this.getPostById = this.getPostById.bind(this);
  }

  public async getPostsByUser(req: CustomRequest, res: Response): Promise<Response> {
    const userId = req.userId || req.query.userId; // Obtener userId del cuerpo o de la consulta
    console.log('req.body.userId', userId);
    try {
      const posts = await this.postService.getPostsByUser(userId as string);
      return res.status(200).json(posts);
    } catch (error) {
      console.log('getPostsByUser', error);
      return res.status(500).json({ error: 'Error fetching posts by user' });
    }
  }

  public async getPostById(req: Request, res: Response): Promise<Response> {
    const postId = req.params.postId;
    try {
      const post = await this.postService.getPostById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json(post);
    } catch (error) {
      console.log('getPostById', error);
      return res.status(500).json({ error: 'Error fetching post by ID' });
    }
  }
}
