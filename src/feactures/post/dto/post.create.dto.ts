import { IsString, IsOptional, IsArray, IsBoolean, IsDateString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  avatarColor?: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsString()
  @IsOptional()
  post?: string;

  @IsString()
  @IsOptional()
  bgColor?: string;

  @IsString()
  @IsOptional()
  imgVersion?: string;

  @IsString()
  @IsOptional()
  imgId?: string;

  @IsString()
  @IsOptional()
  videoVersion?: string;

  @IsString()
  @IsOptional()
  videoId?: string;

  @IsString()
  @IsOptional()
  feelings?: string;

  @IsString()
  @IsOptional()
  gifUrl?: string;

  @IsString()
  @IsOptional()
  privacy?: string;

  @IsOptional()
  @Type(() => Number)
  commentsCount?: number;

  @IsOptional()
  @Type(() => Object)
  reactions?: {
    like?: number;
    love?: number;
    happy?: number;
    wow?: number;
    sad?: number;
    angry?: number;
  };

  @IsArray()
  @IsOptional()
  @Type(() => String)
  tags?: string[];

  @IsString()
  @IsOptional()
  location?: string;

  @IsArray()
  @IsOptional()
  @Type(() => String)
  mentions?: string[];

  @IsDateString()
  @IsOptional()
  editedAt?: Date;

  @IsString()
  @IsOptional()
  sharedPostId?: string;

  @IsBoolean()
  @IsOptional()
  isPinned?: boolean;
}
