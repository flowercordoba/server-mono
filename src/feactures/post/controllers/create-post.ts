import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { CreatePostDto } from '@root/feactures/post/dto/post.create.dto';
import { PostService } from '@root/feactures/post/services/post.service';
import { IPostDocument } from '@root/feactures/post/interfaces/post.interface';
import { socketIOPostObject } from '@socket/socketIOPostHandler';

export class CreatePostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
    this.createPost = this.createPost.bind(this);
    this.createPostWithImage = this.createPostWithImage.bind(this);
    this.createPostWithVideo = this.createPostWithVideo.bind(this);


  }

  // public async createPost(req: Request, res: Response): Promise<void> {
  //   const createPostDto: CreatePostDto = req.body;
  //   console.log('Received createPost request:', createPostDto);

  //   try {
  //     const createdPost: IPostDocument = await this.postService.createTextOnlyPost(createPostDto);
  //     res.status(HTTP_STATUS.CREATED).json(createdPost);
  //   } catch (error) {
  //     console.error('Error creating post:', error);
  //     res.status(500).json({ error: 'Error creating post' });
  //   }
  // }
  public async createPost(req: Request, res: Response): Promise<void> {
    const { user, post, bgColor, privacy, gifUrl, feelings, profilePicture } = req.body;
    console.log('contrlador req.body',req.body);
    
    // Crear un nuevo DTO con el userId correcto del UserModel
    const createPostDto: CreatePostDto = {
      userId: user.id.toString(), // Aquí usamos el userId correcto del UserModel
      username: user.username,
      email: user.email,
      avatarColor: '',
      profilePicture: user.profilePicture || profilePicture,
      post,
      bgColor,
      privacy,
      gifUrl,
      feelings
    };

    console.log('Received createPost request:', createPostDto);

    try {
      const createdPost: IPostDocument = await this.postService.createTextOnlyPost(createPostDto);
      res.status(HTTP_STATUS.CREATED).json(createdPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Error creating post' });
    }
  }

  public async createPostWithImage(req: Request, res: Response): Promise<Response> {
    const createPostDto: CreatePostDto = req.body;
    console.log('createPostDto', createPostDto);
    const { image } = req.body;
    console.log('req.body', req.body);

    if (!image.startsWith('data:image/')) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid image data' });
    }

    try {
      const post: IPostDocument = await this.postService.createPostWithImage(createPostDto, image);
      socketIOPostObject.emit('add post', post); // Emitiendo evento al crear un post con imagen
      return res.status(HTTP_STATUS.CREATED).json(post);
    } catch (error) {
      console.log('error =====>>', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Error creating post with image' });
    }
  }
  public async createPostWithVideo(req: Request, res: Response): Promise<Response> {
    const createPostDto: CreatePostDto = req.body;
    const { video } = req.body;
    try {
      const post: IPostDocument = await this.postService.createPostWithVideo(createPostDto, video);
      socketIOPostObject.emit('add post', post); // Emitiendo evento al crear un post con video
      return res.status(HTTP_STATUS.CREATED).json(post);
    } catch (error) {
      console.log('error =====>>',error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Error creating post with video' });
    }
  }
}
