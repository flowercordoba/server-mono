import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsIn(['public', 'private', 'friends'])
  privacy!: 'public' | 'private' | 'friends';
}

export class UpdateVideoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['public', 'private', 'friends'])
  privacy?: 'public' | 'private' | 'friends';
}

export class UploadVideoDto {
  @IsNotEmpty()
  @IsString()
  video!: string;  // Base64 encoded string

  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsIn(['public', 'private', 'friends'])
  privacy!: 'public' | 'private' | 'friends';
}
