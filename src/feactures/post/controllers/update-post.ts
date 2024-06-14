import { Request, Response } from 'express';
import { PostService } from '../services/post.service';
import { UpdatePostDto } from '../dto/post.update.dto';

export class UpdatePostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
    this.updatePost = this.updatePost.bind(this); // Enlazar el método al contexto
  }

  public async updatePost(req: Request, res: Response): Promise<Response> {
    const postId = req.params.postId;
    const updatePostDto: UpdatePostDto = req.body;
    console.log('updatePostDto',updatePostDto);
    try {
      const updatedPost = await this.postService.updatePost(postId, updatePostDto);
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json(updatedPost);
    } catch (error) {
      console.log('error',error);
      return res.status(500).json({ error: 'Error updating post' });
    }
  }
}
