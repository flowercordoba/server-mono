import { uploads, videoUpload, UploadApiResponse } from '@globals/helpers/cloudinary-upload';
import { CreatePostDto } from '../dto/post.create.dto';
import { UpdatePostDto } from '../dto/post.update.dto';
import { IPostDocument } from '../interfaces/post.interface';
import { PostModel } from '../models/post.schema';
import { Types } from 'mongoose'; // Importar Types de mongoose
import { socketIOPostObject } from '@socket/socketIOPostHandler';
import { BadRequestError } from '@globals/helpers/error-handler';
import { UserModel } from '@root/feactures/user/models/user.model';

export class PostService {
  public async createPost(createPostDto: CreatePostDto): Promise<IPostDocument> {
    console.log('Creating post for userId:', createPostDto.userId);
    
    // Verificar si el userId es válido
    const user = await UserModel.findById(createPostDto.userId);
    if (!user) {
      console.log('Invalid userId:', createPostDto.userId);
      throw new BadRequestError('Invalid userId');
    }

    console.log('User found:', user);

    const newPost: IPostDocument = new PostModel(createPostDto);
    await newPost.save();
    return newPost;
  }

  public async updatePost(postId: string, updatePostDto: UpdatePostDto): Promise<IPostDocument | null> {
    console.log('Updating post:', postId);
    const updatedPost: IPostDocument | null = await PostModel.findByIdAndUpdate(postId, updatePostDto, { new: true });
    console.log('Post updated:', updatedPost);
    return updatedPost;
  }

  public async deletePost(postId: string): Promise<void> {
    console.log('Deleting post:', postId);
    await PostModel.findByIdAndDelete(postId);
    console.log('Post deleted');
  }

  public async getPostsByUser(userId: string): Promise<IPostDocument[]> {
    console.log('Fetching posts for user:', userId);
    const posts: IPostDocument[] = await PostModel.find({ userId });
    console.log('Posts fetched:', posts);
    return posts;
  }

  public async getPostById(postId: string): Promise<IPostDocument | null> {
    console.log('Fetching post by ID:', postId);
    const post: IPostDocument | null = await PostModel.findById(postId);
    console.log('Post fetched:', post);
    return post;
  }
  public async createTextOnlyPost(createPostDto: CreatePostDto): Promise<IPostDocument> {
    const { post, bgColor, privacy, gifUrl, feelings } = createPostDto;
    
    console.log('Creating text-only post for userId:', createPostDto.userId);

    // Verificar si el userId es válido
    const user = await UserModel.findById(createPostDto.userId);
    if (!user) {
      console.log('Invalid userId:', createPostDto.userId);
      throw new BadRequestError('Invalid userId');
    }

    console.log('User found:', user);

    const postObjectId = new Types.ObjectId();
    const createdPost: IPostDocument = new PostModel({
      _id: postObjectId,
      userId: createPostDto.userId,
      username: user.username || '', // Usar el username del usuario encontrado
      email: user.email || '', // Usar el email del usuario encontrado
      avatarColor: createPostDto.avatarColor || '',
      profilePicture: user.profilePicture || '', // Usar el profilePicture del usuario encontrado
      post: post || '',
      bgColor: bgColor || '',
      feelings,
      privacy,
      gifUrl,
      commentsCount: 0,
      imgVersion: '',
      imgId: '',
      videoId: '',
      videoVersion: '',
      createdAt: new Date(),
      reactions: { like: 0, love: 0, happy: 0, sad: 0, wow: 0, angry: 0 }
    });

    console.log('Creating text only post:', createdPost);
    const savedPost = await createdPost.save();
    console.log('Post saved:', savedPost);

    if (socketIOPostObject) {
      socketIOPostObject.emit('add post', savedPost); // Emitiendo evento al crear un post
    } else {
      console.error('socketIOPostObject is not defined');
    }

    return savedPost;
  }


  public async createPostWithImage(createPostDto: CreatePostDto, image: string): Promise<IPostDocument> {
    const result: UploadApiResponse = (await uploads(image)) as UploadApiResponse;
    console.log('result', result);
    if (!result?.public_id) {
      throw new BadRequestError(result.message);
    }

    console.log('Creating post with image for userId:', createPostDto.userId);

    // Verificar si el userId es válido
    const user = await UserModel.findById(createPostDto.userId);
    if (!user) {
      console.log('Invalid userId:', createPostDto.userId);
      throw new BadRequestError('Invalid userId');
    }

    console.log('User found:', user);

    const postObjectId = new Types.ObjectId();
    const imageUrl = `https://res.cloudinary.com/dzqpacupf/image/upload/v${result.version}/${result.public_id}`;
    console.log('postObjectId', postObjectId);

    const createdPost: IPostDocument = new PostModel({
      ...createPostDto,
      _id: postObjectId,
      imgVersion: result.version.toString(),
      imgId: result.public_id,
      videoId: '',
      videoVersion: '',
      createdAt: new Date(),
      imgUrl: imageUrl
    });

    const savedPost = await createdPost.save();
    console.log('savedPost', savedPost);

    return savedPost;
  }

  public async createPostWithVideo(createPostDto: CreatePostDto, video: string): Promise<IPostDocument> {
    const result: UploadApiResponse = (await videoUpload(video)) as UploadApiResponse;
    if (!result?.public_id) {
      throw new BadRequestError(result.message);
    }

    console.log('Creating post with video for userId:', createPostDto.userId);

    // Verificar si el userId es válido
    const user = await UserModel.findById(createPostDto.userId);
    if (!user) {
      console.log('Invalid userId:', createPostDto.userId);
      throw new BadRequestError('Invalid userId');
    }

    console.log('User found:', user);

    const postObjectId = new Types.ObjectId();
    const createdPost: IPostDocument = new PostModel({
      ...createPostDto,
      _id: postObjectId,
      videoVersion: result.version.toString(),
      videoId: result.public_id,
      imgVersion: '',
      imgId: '',
      createdAt: new Date(),
    });

    const savedPost = await createdPost.save();
    return savedPost;
  }
}
